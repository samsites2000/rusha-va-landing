import { NextRequest, NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'
import fs from 'fs/promises'
import path from 'path'

const execAsync = promisify(exec)

interface StyleUpdate {
  selector: string
  property: string
  value: string
}

export async function POST(request: NextRequest) {
  try {
    const { updates }: { updates: StyleUpdate[] } = await request.json()

    if (!updates || updates.length === 0) {
      return NextResponse.json({ error: 'No updates provided' }, { status: 400 })
    }

    // Generate CSS from updates
    const cssUpdates = generateCSSUpdates(updates)

    // Write to a custom CSS file
    const cssPath = path.join(process.cwd(), 'app', 'editor-styles.css')
    await fs.writeFile(cssPath, cssUpdates, 'utf-8')

    // Git operations
    const gitAdd = await execAsync('git add app/editor-styles.css')
    const gitCommit = await execAsync(
      `git commit -m "Update styles via visual editor\n\n🤖 Generated with [Claude Code](https://claude.com/claude-code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>"`
    )
    const gitPush = await execAsync('git push')

    return NextResponse.json({
      success: true,
      message: 'Changes published successfully',
      cssPath,
      updates: updates.length,
      git: {
        add: gitAdd.stdout,
        commit: gitCommit.stdout,
        push: gitPush.stdout
      }
    })
  } catch (error: any) {
    console.error('Publish error:', error)
    return NextResponse.json(
      {
        error: 'Failed to publish changes',
        details: error.message,
        stderr: error.stderr
      },
      { status: 500 }
    )
  }
}

function generateCSSUpdates(updates: StyleUpdate[]): string {
  const grouped = updates.reduce((acc, update) => {
    if (!acc[update.selector]) {
      acc[update.selector] = []
    }
    acc[update.selector].push(`  ${camelToKebab(update.property)}: ${update.value};`)
    return acc
  }, {} as Record<string, string[]>)

  let css = '/* Visual Editor Styles - Auto-generated */\n\n'

  for (const [selector, properties] of Object.entries(grouped)) {
    css += `${selector} {\n${properties.join('\n')}\n}\n\n`
  }

  return css
}

function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()
}

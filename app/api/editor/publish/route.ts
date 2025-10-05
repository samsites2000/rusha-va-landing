import { NextRequest, NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'
import fs from 'fs/promises'
import path from 'path'

const execAsync = promisify(exec)

// GitHub API configuration
const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_OWNER = 'samsites2000'
const GITHUB_REPO = 'rusha-va-landing'
const GITHUB_BRANCH = 'main'

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

    // Check if we're in production (Vercel) or development (local)
    const isProduction = process.env.VERCEL === '1'

    if (isProduction) {
      // Use GitHub API for production
      if (!GITHUB_TOKEN) {
        return NextResponse.json(
          { error: 'GitHub token not configured. Add GITHUB_TOKEN to environment variables.' },
          { status: 500 }
        )
      }

      const result = await commitToGitHub('app/editor-styles.css', cssUpdates)

      return NextResponse.json({
        success: true,
        message: 'Changes published successfully via GitHub API',
        updates: updates.length,
        commitSha: result.commitSha,
        commitUrl: result.commitUrl
      })
    } else {
      // Use local git commands for development
      const cssPath = path.join(process.cwd(), 'app', 'editor-styles.css')
      await fs.writeFile(cssPath, cssUpdates, 'utf-8')

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
    }
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

async function commitToGitHub(filePath: string, content: string) {
  const baseUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`
  const headers = {
    'Authorization': `Bearer ${GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  }

  // 1. Get the current reference
  const refResponse = await fetch(`${baseUrl}/git/refs/heads/${GITHUB_BRANCH}`, { headers })
  const refData = await refResponse.json()
  const currentCommitSha = refData.object.sha

  // 2. Get the current commit
  const commitResponse = await fetch(`${baseUrl}/git/commits/${currentCommitSha}`, { headers })
  const commitData = await commitResponse.json()
  const currentTreeSha = commitData.tree.sha

  // 3. Create a blob with the new file content
  const blobResponse = await fetch(`${baseUrl}/git/blobs`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      content: Buffer.from(content).toString('base64'),
      encoding: 'base64'
    })
  })
  const blobData = await blobResponse.json()

  // 4. Create a new tree with the updated file
  const treeResponse = await fetch(`${baseUrl}/git/trees`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      base_tree: currentTreeSha,
      tree: [{
        path: filePath,
        mode: '100644',
        type: 'blob',
        sha: blobData.sha
      }]
    })
  })
  const treeData = await treeResponse.json()

  // 5. Create a new commit
  const newCommitResponse = await fetch(`${baseUrl}/git/commits`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      message: 'Update styles via visual editor\n\n🤖 Generated with [Claude Code](https://claude.com/claude-code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>',
      tree: treeData.sha,
      parents: [currentCommitSha]
    })
  })
  const newCommitData = await newCommitResponse.json()

  // 6. Update the reference
  const updateRefResponse = await fetch(`${baseUrl}/git/refs/heads/${GITHUB_BRANCH}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
      sha: newCommitData.sha
    })
  })

  return {
    commitSha: newCommitData.sha,
    commitUrl: newCommitData.html_url || `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/commit/${newCommitData.sha}`
  }
}

function generateCSSUpdates(updates: StyleUpdate[]): string {
  const mobileStyles: Record<string, string[]> = {}
  const desktopStyles: Record<string, string[]> = {}

  updates.forEach(update => {
    // Check if property has media query prefix
    if (update.property.startsWith('@media(md):')) {
      const actualProperty = update.property.replace('@media(md):', '')
      if (!desktopStyles[update.selector]) {
        desktopStyles[update.selector] = []
      }
      desktopStyles[update.selector].push(`  ${camelToKebab(actualProperty)}: ${update.value};`)
    } else {
      if (!mobileStyles[update.selector]) {
        mobileStyles[update.selector] = []
      }
      mobileStyles[update.selector].push(`  ${camelToKebab(update.property)}: ${update.value};`)
    }
  })

  let css = '/* Visual Editor Styles - Auto-generated */\n\n'

  // Mobile styles (default)
  for (const [selector, properties] of Object.entries(mobileStyles)) {
    css += `${selector} {\n${properties.join('\n')}\n}\n\n`
  }

  // Desktop styles (media query)
  if (Object.keys(desktopStyles).length > 0) {
    css += '@media (min-width: 768px) {\n'
    for (const [selector, properties] of Object.entries(desktopStyles)) {
      css += `  ${selector} {\n${properties.map(p => '  ' + p).join('\n')}\n  }\n\n`
    }
    css += '}\n'
  }

  return css
}

function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()
}

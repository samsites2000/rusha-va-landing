'use client'

import { useEffect, useState } from 'react'
import { useVisualEditor } from './visual-editor-context'

export function ElementSelector() {
  const { isEditMode, selectedElement, setSelectedElement } = useVisualEditor()
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    if (!isEditMode) {
      setHoveredElement(null)
      // Restore default cursor when exiting edit mode
      const styleEl = document.getElementById('editor-cursor-override')
      if (styleEl) styleEl.remove()
      document.body.style.cursor = ''
      return
    }

    // Force default cursor in edit mode (override custom cursor)
    document.body.style.cursor = 'default'
    if (!document.getElementById('editor-cursor-override')) {
      const style = document.createElement('style')
      style.id = 'editor-cursor-override'
      style.textContent = '* { cursor: default !important; }'
      document.head.appendChild(style)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      // Ignore editor UI elements and navigation
      if (
        target.closest('[data-editor-ui]') ||
        target.closest('button') ||
        target.closest('nav') ||
        target.closest('header') ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'HTML' ||
        target.tagName === 'BODY'
      ) {
        return
      }

      // Allow selecting any element with meaningful content
      const editableEl = target.closest('div, section, p, h1, h2, h3, h4, h5, h6, span, a, [data-editable]') as HTMLElement
      if (editableEl && editableEl !== selectedElement) {
        setHoveredElement(editableEl)
      }
    }

    const handleMouseOut = () => {
      setHoveredElement(null)
    }

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      // Ignore editor UI elements and navigation
      if (
        target.closest('[data-editor-ui]') ||
        target.closest('button') ||
        target.closest('nav') ||
        target.closest('header') ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'HTML' ||
        target.tagName === 'BODY'
      ) {
        return
      }

      const editableEl = target.closest('div, section, p, h1, h2, h3, h4, h5, h6, span, a, [data-editable]') as HTMLElement
      if (editableEl) {
        e.preventDefault()
        e.stopPropagation()
        setSelectedElement(editableEl)
        setHoveredElement(null)
      }
    }

    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)
    document.addEventListener('click', handleClick, true)

    return () => {
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      document.removeEventListener('click', handleClick, true)

      // Clean up cursor override
      const styleEl = document.getElementById('editor-cursor-override')
      if (styleEl) styleEl.remove()
      document.body.style.cursor = ''
    }
  }, [isEditMode, selectedElement, setSelectedElement])

  if (!isEditMode) return null

  return (
    <>
      {/* Hover overlay */}
      {hoveredElement && hoveredElement !== selectedElement && (
        <div
          className="pointer-events-none fixed z-[9998] border-2 border-blue-400 bg-blue-400/10"
          style={{
            top: hoveredElement.getBoundingClientRect().top,
            left: hoveredElement.getBoundingClientRect().left,
            width: hoveredElement.getBoundingClientRect().width,
            height: hoveredElement.getBoundingClientRect().height
          }}
        />
      )}

      {/* Selected overlay */}
      {selectedElement && (
        <div
          className="pointer-events-none fixed z-[9998] border-2 border-orange-500 bg-orange-500/10"
          style={{
            top: selectedElement.getBoundingClientRect().top,
            left: selectedElement.getBoundingClientRect().left,
            width: selectedElement.getBoundingClientRect().width,
            height: selectedElement.getBoundingClientRect().height
          }}
        >
          <div className="absolute -top-8 left-0 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-t">
            {selectedElement.tagName.toLowerCase()}
            {selectedElement.className && `.${selectedElement.className.split(' ')[0]}`}
          </div>
        </div>
      )}
    </>
  )
}

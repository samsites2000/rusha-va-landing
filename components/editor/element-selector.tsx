'use client'

import { useEffect, useState } from 'react'
import { useVisualEditor } from './visual-editor-context'

export function ElementSelector() {
  const { isEditMode, selectedElement, setSelectedElement } = useVisualEditor()
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    if (!isEditMode) {
      setHoveredElement(null)
      return
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      // Ignore editor UI elements
      if (
        target.closest('[data-editor-ui]') ||
        target.closest('button') ||
        target.tagName === 'BUTTON'
      ) {
        return
      }

      // Find the closest section or editable container
      const editableEl = target.closest('section, [data-editable]') as HTMLElement
      if (editableEl && editableEl !== selectedElement) {
        setHoveredElement(editableEl)
      }
    }

    const handleMouseOut = () => {
      setHoveredElement(null)
    }

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      // Ignore editor UI elements
      if (
        target.closest('[data-editor-ui]') ||
        target.closest('button') ||
        target.tagName === 'BUTTON'
      ) {
        return
      }

      const editableEl = target.closest('section, [data-editable]') as HTMLElement
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

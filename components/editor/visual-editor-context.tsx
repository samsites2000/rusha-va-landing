'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'

interface StyleUpdate {
  selector: string
  property: string
  value: string
}

interface VisualEditorContextType {
  isEditMode: boolean
  setIsEditMode: (enabled: boolean) => void
  selectedElement: HTMLElement | null
  setSelectedElement: (element: HTMLElement | null) => void
  styleUpdates: StyleUpdate[]
  addStyleUpdate: (update: StyleUpdate) => void
  clearStyleUpdates: () => void
  publishChanges: () => Promise<void>
  isPublishing: boolean
}

const VisualEditorContext = createContext<VisualEditorContextType | undefined>(undefined)

export function VisualEditorProvider({ children }: { children: React.ReactNode }) {
  const [isEditMode, setIsEditMode] = useState(false)
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null)
  const [styleUpdates, setStyleUpdates] = useState<StyleUpdate[]>([])
  const [isPublishing, setIsPublishing] = useState(false)

  const addStyleUpdate = useCallback((update: StyleUpdate) => {
    setStyleUpdates(prev => {
      const existing = prev.findIndex(
        u => u.selector === update.selector && u.property === update.property
      )
      if (existing >= 0) {
        const newUpdates = [...prev]
        newUpdates[existing] = update
        return newUpdates
      }
      return [...prev, update]
    })
  }, [])

  const clearStyleUpdates = useCallback(() => {
    setStyleUpdates([])
  }, [])

  const publishChanges = useCallback(async () => {
    if (styleUpdates.length === 0) return

    setIsPublishing(true)
    try {
      const response = await fetch('/api/editor/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates: styleUpdates })
      })

      if (!response.ok) {
        throw new Error('Failed to publish changes')
      }

      const result = await response.json()
      console.log('Published successfully:', result)
      clearStyleUpdates()
    } catch (error) {
      console.error('Publish error:', error)
      alert('Failed to publish changes. Check console for details.')
    } finally {
      setIsPublishing(false)
    }
  }, [styleUpdates, clearStyleUpdates])

  return (
    <VisualEditorContext.Provider
      value={{
        isEditMode,
        setIsEditMode,
        selectedElement,
        setSelectedElement,
        styleUpdates,
        addStyleUpdate,
        clearStyleUpdates,
        publishChanges,
        isPublishing
      }}
    >
      {children}
    </VisualEditorContext.Provider>
  )
}

export function useVisualEditor() {
  const context = useContext(VisualEditorContext)
  if (!context) {
    throw new Error('useVisualEditor must be used within VisualEditorProvider')
  }
  return context
}

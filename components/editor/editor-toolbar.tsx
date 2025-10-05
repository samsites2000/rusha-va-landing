'use client'

import { useVisualEditor } from './visual-editor-context'
import { Edit3, X, Upload, RotateCcw } from 'lucide-react'

export function EditorToolbar() {
  const {
    isEditMode,
    setIsEditMode,
    styleUpdates,
    publishChanges,
    isPublishing,
    clearStyleUpdates,
    setSelectedElement
  } = useVisualEditor()

  const handleToggleEdit = () => {
    setIsEditMode(!isEditMode)
    if (isEditMode) {
      setSelectedElement(null)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2">
      {isEditMode && (
        <div className="bg-white rounded-lg shadow-2xl p-4 border-2 border-orange-500">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-gray-700">
                Edit Mode Active
              </span>
            </div>
            <div className="text-xs text-gray-500">
              {styleUpdates.length} change{styleUpdates.length !== 1 ? 's' : ''}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                clearStyleUpdates()
                setSelectedElement(null)
              }}
              disabled={styleUpdates.length === 0}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-md text-sm font-medium text-gray-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>

            <button
              onClick={publishChanges}
              disabled={styleUpdates.length === 0 || isPublishing}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-md text-sm font-semibold transition-colors"
            >
              <Upload className="w-4 h-4" />
              {isPublishing ? 'Publishing...' : 'Publish to GitHub'}
            </button>
          </div>
        </div>
      )}

      <button
        onClick={handleToggleEdit}
        className={`
          flex items-center gap-2 px-4 py-3 rounded-full shadow-2xl font-semibold text-sm transition-all
          ${isEditMode
            ? 'bg-red-500 hover:bg-red-600 text-white'
            : 'bg-orange-500 hover:bg-orange-600 text-white'
          }
        `}
      >
        {isEditMode ? (
          <>
            <X className="w-5 h-5" />
            Exit Editor
          </>
        ) : (
          <>
            <Edit3 className="w-5 h-5" />
            Edit Page
          </>
        )}
      </button>
    </div>
  )
}

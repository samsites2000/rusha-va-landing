'use client'

import { useEffect, useState } from 'react'
import { useVisualEditor } from './visual-editor-context'
import { X, Palette, Type, Box, Layout } from 'lucide-react'

export function StylePanel() {
  const { selectedElement, setSelectedElement, addStyleUpdate } = useVisualEditor()
  const [styles, setStyles] = useState({
    paddingTop: '',
    paddingBottom: '',
    paddingLeft: '',
    paddingRight: '',
    marginTop: '',
    marginBottom: '',
    fontSize: '',
    fontWeight: '',
    color: '',
    backgroundColor: '',
    borderRadius: '',
    width: '',
    height: ''
  })

  useEffect(() => {
    if (!selectedElement) return

    const computed = window.getComputedStyle(selectedElement)
    setStyles({
      paddingTop: computed.paddingTop,
      paddingBottom: computed.paddingBottom,
      paddingLeft: computed.paddingLeft,
      paddingRight: computed.paddingRight,
      marginTop: computed.marginTop,
      marginBottom: computed.marginBottom,
      fontSize: computed.fontSize,
      fontWeight: computed.fontWeight,
      color: computed.color,
      backgroundColor: computed.backgroundColor,
      borderRadius: computed.borderRadius,
      width: computed.width,
      height: computed.height
    })
  }, [selectedElement])

  if (!selectedElement) return null

  const handleStyleChange = (property: string, value: string) => {
    // Update the element's inline style
    selectedElement.style[property as any] = value

    // Update local state
    setStyles(prev => ({
      ...prev,
      [property]: value
    }))

    const selector = selectedElement.className
      ? `.${selectedElement.className.split(' ')[0]}`
      : selectedElement.tagName.toLowerCase()

    addStyleUpdate({
      selector,
      property,
      value
    })
  }

  const parseValue = (cssValue: string) => {
    return parseInt(cssValue) || 0
  }

  return (
    <div
      data-editor-ui
      className="fixed top-20 right-6 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 z-[9999] max-h-[80vh] overflow-y-auto"
    >
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-orange-500" />
          <h3 className="font-semibold text-gray-900">Edit Styles</h3>
        </div>
        <button
          onClick={() => setSelectedElement(null)}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 space-y-6">
        {/* Spacing */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Box className="w-4 h-4 text-gray-600" />
            <h4 className="font-semibold text-sm text-gray-700">Spacing</h4>
          </div>

          <div className="space-y-2">
            <label className="block">
              <span className="text-xs text-gray-600">Padding</span>
              <div className="grid grid-cols-4 gap-2 mt-1">
                <input
                  type="number"
                  placeholder="Top"
                  value={parseValue(styles.paddingTop)}
                  onChange={(e) => handleStyleChange('paddingTop', `${e.target.value}px`)}
                  className="px-2 py-1 border rounded text-sm"
                />
                <input
                  type="number"
                  placeholder="Right"
                  value={parseValue(styles.paddingRight)}
                  onChange={(e) => handleStyleChange('paddingRight', `${e.target.value}px`)}
                  className="px-2 py-1 border rounded text-sm"
                />
                <input
                  type="number"
                  placeholder="Bottom"
                  value={parseValue(styles.paddingBottom)}
                  onChange={(e) => handleStyleChange('paddingBottom', `${e.target.value}px`)}
                  className="px-2 py-1 border rounded text-sm"
                />
                <input
                  type="number"
                  placeholder="Left"
                  value={parseValue(styles.paddingLeft)}
                  onChange={(e) => handleStyleChange('paddingLeft', `${e.target.value}px`)}
                  className="px-2 py-1 border rounded text-sm"
                />
              </div>
            </label>

            <label className="block">
              <span className="text-xs text-gray-600">Margin</span>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <input
                  type="number"
                  placeholder="Top"
                  value={parseValue(styles.marginTop)}
                  onChange={(e) => handleStyleChange('marginTop', `${e.target.value}px`)}
                  className="px-2 py-1 border rounded text-sm"
                />
                <input
                  type="number"
                  placeholder="Bottom"
                  value={parseValue(styles.marginBottom)}
                  onChange={(e) => handleStyleChange('marginBottom', `${e.target.value}px`)}
                  className="px-2 py-1 border rounded text-sm"
                />
              </div>
            </label>
          </div>
        </div>

        {/* Typography */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Type className="w-4 h-4 text-gray-600" />
            <h4 className="font-semibold text-sm text-gray-700">Typography</h4>
          </div>

          <div className="space-y-2">
            <label className="block">
              <span className="text-xs text-gray-600">Font Size (px)</span>
              <input
                type="number"
                value={parseValue(styles.fontSize)}
                onChange={(e) => handleStyleChange('fontSize', `${e.target.value}px`)}
                className="w-full px-3 py-2 border rounded mt-1"
              />
            </label>

            <label className="block">
              <span className="text-xs text-gray-600">Font Weight</span>
              <select
                value={styles.fontWeight}
                onChange={(e) => handleStyleChange('fontWeight', e.target.value)}
                className="w-full px-3 py-2 border rounded mt-1"
              >
                <option value="300">Light (300)</option>
                <option value="400">Normal (400)</option>
                <option value="500">Medium (500)</option>
                <option value="600">Semibold (600)</option>
                <option value="700">Bold (700)</option>
              </select>
            </label>
          </div>
        </div>

        {/* Size */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Layout className="w-4 h-4 text-gray-600" />
            <h4 className="font-semibold text-sm text-gray-700">Size</h4>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <label className="block">
              <span className="text-xs text-gray-600">Width (px or %)</span>
              <input
                type="text"
                value={styles.width}
                onChange={(e) => handleStyleChange('width', e.target.value)}
                className="w-full px-3 py-2 border rounded mt-1"
              />
            </label>

            <label className="block">
              <span className="text-xs text-gray-600">Height (px or %)</span>
              <input
                type="text"
                value={styles.height}
                onChange={(e) => handleStyleChange('height', e.target.value)}
                className="w-full px-3 py-2 border rounded mt-1"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

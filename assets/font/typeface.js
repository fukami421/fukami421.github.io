/* eslint-disable */
/*****************************************************************
typeface.js, version 0.14 | typefacejs.neocracy.org
Copyright (c) 2008 - 2009, David Chester davidchester@gmx.net
Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:
The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
*****************************************************************/

(function () {
  const _typeface_js = {

    faces: {},

    loadFace(typefaceData) {
      const familyName = typefaceData.familyName.toLowerCase()

      if (!this.faces[familyName]) {
        this.faces[familyName] = {}
      }
      if (!this.faces[familyName][typefaceData.cssFontWeight]) {
        this.faces[familyName][typefaceData.cssFontWeight] = {}
      }

      const face = this.faces[familyName][typefaceData.cssFontWeight][typefaceData.cssFontStyle] = typefaceData
      face.loaded = true
    },

    log(message) {
      if (this.quiet) {
        return
      }

      message = 'typeface.js: ' + message

      if (this.customLogFn) {
        this.customLogFn(message)
      } else if (window.console && window.console.log) {
        window.console.log(message)
      }
    },

    pixelsFromPoints(face, style, points, dimension) {
      let pixels = points * parseInt(style.fontSize) * 72 / (face.resolution * 100)
      if (dimension == 'horizontal' && style.fontStretchPercent) {
        pixels *= style.fontStretchPercent
      }
      return pixels
    },

    pointsFromPixels(face, style, pixels, dimension) {
      let points = pixels * face.resolution / (parseInt(style.fontSize) * 72 / 100)
      if (dimension == 'horizontal' && style.fontStretchPrecent) {
        points *= style.fontStretchPercent
      }
      return points
    },

    cssFontWeightMap: {
      normal: 'normal',
      bold: 'bold',
      400: 'normal',
      700: 'bold'
    },

    cssFontStretchMap: {
      'ultra-condensed': 0.55,
      'extra-condensed': 0.77,
      'condensed': 0.85,
      'semi-condensed': 0.93,
      'normal': 1,
      'semi-expanded': 1.07,
      'expanded': 1.15,
      'extra-expanded': 1.23,
      'ultra-expanded': 1.45,
      'default': 1
    },

    fallbackCharacter: '.',

    configure(args) {
      const configurableOptionNames = ['customLogFn', 'customClassNameRegex', 'customTypefaceElementsList', 'quiet', 'verbose', 'disableSelection']

      for (let i = 0; i < configurableOptionNames.length; i++) {
        const optionName = configurableOptionNames[i]
        if (args[optionName]) {
          if (optionName == 'customLogFn') {
            if (typeof args[optionName] !== 'function') {
              throw 'customLogFn is not a function'
            } else {
              this.customLogFn = args.customLogFn
            }
          } else {
            this[optionName] = args[optionName]
          }
        }
      }
    },

    getTextExtents(face, style, text) {
      let extentX = 0
      const extentY = 0
      let horizontalAdvance

      const textLength = text.length
      for (let i = 0; i < textLength; i++) {
        const glyph = face.glyphs[text.charAt(i)] ? face.glyphs[text.charAt(i)] : face.glyphs[this.fallbackCharacter]
        const letterSpacingAdjustment = this.pointsFromPixels(face, style, style.letterSpacing)

        // if we're on the last character, go with the glyph extent if that's more than the horizontal advance
        extentX += i + 1 == textLength ? Math.max(glyph.x_max, glyph.ha) : glyph.ha
        extentX += letterSpacingAdjustment

        horizontalAdvance += glyph.ha + letterSpacingAdjustment
      }
      return {
        x: extentX,
        y: extentY,
        ha: horizontalAdvance

      }
    },

    pixelsFromCssAmount(cssAmount, defaultValue, element) {
      let matches

      if (cssAmount == 'normal') {
        return defaultValue
      } else if (matches = cssAmount.match(/([\-\d+\.]+)px/)) {
        return matches[1]
      } else {
        // thanks to Dean Edwards for this very sneaky way to get IE to convert
        // relative values to pixel values

        let pixelAmount

        const leftInlineStyle = element.style.left
        const leftRuntimeStyle = element.runtimeStyle.left

        element.runtimeStyle.left = element.currentStyle.left

        if (!cssAmount.match(/\d(px|pt)$/)) {
          element.style.left = '1em'
        } else {
          element.style.left = cssAmount || 0
        }

        pixelAmount = element.style.pixelLeft

        element.style.left = leftInlineStyle
        element.runtimeStyle.left = leftRuntimeStyle

        return pixelAmount || defaultValue
      }
    },

    capitalizeText(text) {
      return text.replace(/(^|\s)[a-z]/g, function (match) { return match.toUpperCase() })
    },

    getElementStyle(e) {
      if (window.getComputedStyle) {
        return window.getComputedStyle(e, '')
      } else if (e.currentStyle) {
        return e.currentStyle
      }
    },

    getRenderedText(e) {
      const browserStyle = this.getElementStyle(e.parentNode)

      let inlineStyleAttribute = e.parentNode.getAttribute('style')
      if (inlineStyleAttribute && typeof (inlineStyleAttribute) === 'object') {
        inlineStyleAttribute = inlineStyleAttribute.cssText
      }

      if (inlineStyleAttribute) {
        const inlineStyleDeclarations = inlineStyleAttribute.split(/\s*\;\s*/)

        var inlineStyle = {}
        for (var i = 0; i < inlineStyleDeclarations.length; i++) {
          const declaration = inlineStyleDeclarations[i]
          const declarationOperands = declaration.split(/\s*\:\s*/)
          inlineStyle[declarationOperands[0]] = declarationOperands[1]
        }
      }

      const style = {
        color: browserStyle.color,
        fontFamily: browserStyle.fontFamily.split(/\s*,\s*/)[0].replace(/(^"|^'|'$|"$)/g, '').toLowerCase(),
        fontSize: this.pixelsFromCssAmount(browserStyle.fontSize, 12, e.parentNode),
        fontWeight: this.cssFontWeightMap[browserStyle.fontWeight],
        fontStyle: browserStyle.fontStyle ? browserStyle.fontStyle : 'normal',
        fontStretchPercent: this.cssFontStretchMap[inlineStyle && inlineStyle['font-stretch'] ? inlineStyle['font-stretch'] : 'default'],
        textDecoration: browserStyle.textDecoration,
        lineHeight: this.pixelsFromCssAmount(browserStyle.lineHeight, 'normal', e.parentNode),
        letterSpacing: this.pixelsFromCssAmount(browserStyle.letterSpacing, 0, e.parentNode),
        textTransform: browserStyle.textTransform
      }

      let face
      if (
        this.faces[style.fontFamily] &&
        this.faces[style.fontFamily][style.fontWeight]
      ) {
        face = this.faces[style.fontFamily][style.fontWeight][style.fontStyle]
      }

      let text = e.nodeValue

      if (
        e.previousSibling &&
        e.previousSibling.nodeType == 1 &&
        e.previousSibling.tagName != 'BR' &&
        this.getElementStyle(e.previousSibling).display.match(/inline/)
      ) {
        text = text.replace(/^\s+/, ' ')
      } else {
        text = text.replace(/^\s+/, '')
      }

      if (
        e.nextSibling &&
        e.nextSibling.nodeType == 1 &&
        e.nextSibling.tagName != 'BR' &&
        this.getElementStyle(e.nextSibling).display.match(/inline/)
      ) {
        text = text.replace(/\s+$/, ' ')
      } else {
        text = text.replace(/\s+$/, '')
      }

      text = text.replace(/\s+/g, ' ')

      if (style.textTransform && style.textTransform != 'none') {
        switch (style.textTransform) {
          case 'capitalize':
            text = this.capitalizeText(text)
            break
          case 'uppercase':
            text = text.toUpperCase()
            break
          case 'lowercase':
            text = text.toLowerCase()
            break
        }
      }

      if (!face) {
        const excerptLength = 12
        let textExcerpt = text.substring(0, excerptLength)
        if (text.length > excerptLength) {
          textExcerpt += '...'
        }

        let fontDescription = style.fontFamily
        if (style.fontWeight != 'normal') { fontDescription += ' ' + style.fontWeight }
        if (style.fontStyle != 'normal') { fontDescription += ' ' + style.fontStyle }

        this.log("couldn't find typeface font: " + fontDescription + ' for text "' + textExcerpt + '"')
        return
      }

      const words = text.split(/\b(?=\w)/)

      const containerSpan = document.createElement('span')
      containerSpan.className = 'typeface-js-vector-container'

      const wordsLength = words.length
      for (var i = 0; i < wordsLength; i++) {
        const word = words[i]

        const vector = this.renderWord(face, style, word)

        if (vector) {
          containerSpan.appendChild(vector.element)

          if (!this.disableSelection) {
            const selectableSpan = document.createElement('span')
            selectableSpan.className = 'typeface-js-selected-text'

            const wordNode = document.createTextNode(word)
            selectableSpan.appendChild(wordNode)

            if (this.vectorBackend != 'vml') {
              selectableSpan.style.marginLeft = -1 * (vector.width + 1) + 'px'
            }
            selectableSpan.targetWidth = vector.width
            // selectableSpan.style.lineHeight = 1 + 'px';

            if (this.vectorBackend == 'vml') {
              vector.element.appendChild(selectableSpan)
            } else {
              containerSpan.appendChild(selectableSpan)
            }
          }
        }
      }

      return containerSpan
    },

    renderDocument(callback) {
      if (!callback) { callback = function (e) { e.style.visibility = 'visible' } }

      const elements = document.getElementsByTagName('*')

      const elementsLength = elements.length
      for (let i = 0; i < elements.length; i++) {
        if (elements[i].className.match(/(^|\s)typeface-js(\s|$)/) || elements[i].tagName.match(/^(H1|H2|H3|H4|H5|H6)$/)) {
          this.replaceText(elements[i])
          if (typeof callback === 'function') {
            callback(elements[i])
          }
        }
      }

      if (this.vectorBackend == 'vml') {
        // lamely work around IE's quirky leaving off final dynamic shapes
        const dummyShape = document.createElement('v:shape')
        dummyShape.style.display = 'none'
        document.body.appendChild(dummyShape)
      }
    },

    replaceText(e) {
      const childNodes = []
      var childNodesLength = e.childNodes.length

      for (var i = 0; i < childNodesLength; i++) {
        this.replaceText(e.childNodes[i])
      }

      if (e.nodeType == 3 && e.nodeValue.match(/\S/)) {
        const parentNode = e.parentNode

        if (parentNode.className == 'typeface-js-selected-text') {
          return
        }

        const renderedText = this.getRenderedText(e)

        if (
          parentNode.tagName == 'A' &&
          this.vectorBackend == 'vml' &&
          this.getElementStyle(parentNode).display == 'inline'
        ) {
          // something of a hack, use inline-block to get IE to accept clicks in whitespace regions
          parentNode.style.display = 'inline-block'
          parentNode.style.cursor = 'pointer'
        }

        if (this.getElementStyle(parentNode).display == 'inline') {
          parentNode.style.display = 'inline-block'
        }

        if (renderedText) {
          if (parentNode.replaceChild) {
            parentNode.replaceChild(renderedText, e)
          } else {
            parentNode.insertBefore(renderedText, e)
            parentNode.removeChild(e)
          }
          if (this.vectorBackend == 'vml') {
            renderedText.innerHTML = renderedText.innerHTML
          }

          var childNodesLength = renderedText.childNodes.length
          for (var i; i < childNodesLength; i++) {
            // do our best to line up selectable text with rendered text

            var e = renderedText.childNodes[i]
            if (e.hasChildNodes() && !e.targetWidth) {
              e = e.childNodes[0]
            }

            if (e && e.targetWidth) {
              const letterSpacingCount = e.innerHTML.length
              const wordSpaceDelta = e.targetWidth - e.offsetWidth
              let letterSpacing = wordSpaceDelta / (letterSpacingCount || 1)

              if (this.vectorBackend == 'vml') {
                letterSpacing = Math.ceil(letterSpacing)
              }

              e.style.letterSpacing = letterSpacing + 'px'
              e.style.width = e.targetWidth + 'px'
            }
          }
        }
      }
    },

    applyElementVerticalMetrics(face, style, e) {
      if (style.lineHeight == 'normal') {
        style.lineHeight = this.pixelsFromPoints(face, style, face.lineHeight)
      }

      const cssLineHeightAdjustment = style.lineHeight - this.pixelsFromPoints(face, style, face.lineHeight)

      e.style.marginTop = Math.round(cssLineHeightAdjustment / 2) + 'px'
      e.style.marginBottom = Math.round(cssLineHeightAdjustment / 2) + 'px'
    },

    vectorBackends: {

      canvas: {

        _initializeSurface(face, style, text) {
          const extents = this.getTextExtents(face, style, text)

          const canvas = document.createElement('canvas')
          if (this.disableSelection) {
            canvas.innerHTML = text
          }

          canvas.height = Math.round(this.pixelsFromPoints(face, style, face.lineHeight))
          canvas.width = Math.round(this.pixelsFromPoints(face, style, extents.x, 'horizontal'))

          this.applyElementVerticalMetrics(face, style, canvas)

          if (extents.x > extents.ha) { canvas.style.marginRight = Math.round(this.pixelsFromPoints(face, style, extents.x - extents.ha, 'horizontal')) + 'px' }

          const ctx = canvas.getContext('2d')

          const pointScale = this.pixelsFromPoints(face, style, 1)
          ctx.scale(pointScale * style.fontStretchPercent, -1 * pointScale)
          ctx.translate(0, -1 * face.ascender)
          ctx.fillStyle = style.color

          return { context: ctx, canvas }
        },

        _renderGlyph(ctx, face, char, style) {
          const glyph = face.glyphs[char]

          if (!glyph) {
            // this.log.error("glyph not defined: " + char);
            return this.renderGlyph(ctx, face, this.fallbackCharacter, style)
          }

          if (glyph.o) {
            let outline
            if (glyph.cached_outline) {
              outline = glyph.cached_outline
            } else {
              outline = glyph.o.split(' ')
              glyph.cached_outline = outline
            }

            const outlineLength = outline.length
            for (let i = 0; i < outlineLength;) {
              const action = outline[i++]

              switch (action) {
                case 'm':
                  ctx.moveTo(outline[i++], outline[i++])
                  break
                case 'l':
                  ctx.lineTo(outline[i++], outline[i++])
                  break

                case 'q':
                  var cpx = outline[i++]
                  var cpy = outline[i++]
                  ctx.quadraticCurveTo(outline[i++], outline[i++], cpx, cpy)
                  break

                case 'b':
                  var x = outline[i++]
                  var y = outline[i++]
                  ctx.bezierCurveTo(outline[i++], outline[i++], outline[i++], outline[i++], x, y)
                  break
              }
            }
          }
          if (glyph.ha) {
            const letterSpacingPoints =
              style.letterSpacing && style.letterSpacing != 'normal'
                ? this.pointsFromPixels(face, style, style.letterSpacing)
                : 0

            ctx.translate(glyph.ha + letterSpacingPoints, 0)
          }
        },

        _renderWord(face, style, text) {
          const surface = this.initializeSurface(face, style, text)
          const ctx = surface.context
          const canvas = surface.canvas
          ctx.beginPath()
          ctx.save()

          const chars = text.split('')
          const charsLength = chars.length
          for (let i = 0; i < charsLength; i++) {
            this.renderGlyph(ctx, face, chars[i], style)
          }

          ctx.fill()

          if (style.textDecoration == 'underline') {
            ctx.beginPath()
            ctx.moveTo(0, face.underlinePosition)
            ctx.restore()
            ctx.lineTo(0, face.underlinePosition)
            ctx.strokeStyle = style.color
            ctx.lineWidth = face.underlineThickness
            ctx.stroke()
          }

          return { element: ctx.canvas, width: Math.floor(canvas.width) }
        }
      },

      vml: {

        _initializeSurface(face, style, text) {
          const shape = document.createElement('v:shape')

          const extents = this.getTextExtents(face, style, text)

          shape.style.width = shape.style.height = style.fontSize + 'px'
          shape.style.marginLeft = '-1px' // this seems suspect...

          if (extents.x > extents.ha) {
            shape.style.marginRight = this.pixelsFromPoints(face, style, extents.x - extents.ha, 'horizontal') + 'px'
          }

          this.applyElementVerticalMetrics(face, style, shape)

          const resolutionScale = face.resolution * 100 / 72
          shape.coordsize = (resolutionScale / style.fontStretchPercent) + ',' + resolutionScale

          shape.coordorigin = '0,' + face.ascender
          shape.style.flip = 'y'

          shape.fillColor = style.color
          shape.stroked = false

          shape.path = 'hh m 0,' + face.ascender + ' l 0,' + face.descender + ' '

          return shape
        },

        _renderGlyph(shape, face, char, offsetX, style, vmlSegments) {
          const glyph = face.glyphs[char]

          if (!glyph) {
            this.log('glyph not defined: ' + char)
            this.renderGlyph(shape, face, this.fallbackCharacter, offsetX, style)
            return
          }

          vmlSegments.push('m')

          if (glyph.o) {
            let outline, outlineLength

            if (glyph.cached_outline) {
              outline = glyph.cached_outline
              outlineLength = outline.length
            } else {
              outline = glyph.o.split(' ')
              outlineLength = outline.length

              for (var i = 0; i < outlineLength;) {
                switch (outline[i++]) {
                  case 'q':
                    outline[i] = Math.round(outline[i++])
                    outline[i] = Math.round(outline[i++])
                  case 'm':
                  case 'l':
                    outline[i] = Math.round(outline[i++])
                    outline[i] = Math.round(outline[i++])
                    break
                }
              }

              glyph.cached_outline = outline
            }

            let prevX, prevY

            for (var i = 0; i < outlineLength;) {
              const action = outline[i++]

              const x = Math.round(outline[i++]) + offsetX
              const y = Math.round(outline[i++])

              switch (action) {
                case 'm':
                  vmlSegments.push('xm ', x, ',', y)
                  break

                case 'l':
                  vmlSegments.push('l ', x, ',', y)
                  break

                case 'q':
                  var cpx = outline[i++] + offsetX
                  var cpy = outline[i++]

                  var cp1x = Math.round(prevX + 2.0 / 3.0 * (cpx - prevX))
                  var cp1y = Math.round(prevY + 2.0 / 3.0 * (cpy - prevY))

                  var cp2x = Math.round(cp1x + (x - prevX) / 3.0)
                  var cp2y = Math.round(cp1y + (y - prevY) / 3.0)

                  vmlSegments.push('c ', cp1x, ',', cp1y, ',', cp2x, ',', cp2y, ',', x, ',', y)
                  break

                case 'b':
                  var cp1x = Math.round(outline[i++]) + offsetX
                  var cp1y = outline[i++]

                  var cp2x = Math.round(outline[i++]) + offsetX
                  var cp2y = outline[i++]

                  vmlSegments.push('c ', cp1x, ',', cp1y, ',', cp2x, ',', cp2y, ',', x, ',', y)
                  break
              }

              prevX = x
              prevY = y
            }
          }

          vmlSegments.push('x e')
          return vmlSegments
        },

        _renderWord(face, style, text) {
          let offsetX = 0
          const shape = this.initializeSurface(face, style, text)

          let letterSpacingPoints =
            style.letterSpacing && style.letterSpacing != 'normal'
              ? this.pointsFromPixels(face, style, style.letterSpacing)
              : 0

          letterSpacingPoints = Math.round(letterSpacingPoints)
          const chars = text.split('')
          let vmlSegments = []
          for (let i = 0; i < chars.length; i++) {
            const char = chars[i]
            vmlSegments = this.renderGlyph(shape, face, char, offsetX, style, vmlSegments)
            offsetX += face.glyphs[char].ha + letterSpacingPoints
          }

          if (style.textDecoration == 'underline') {
            const posY = face.underlinePosition - (face.underlineThickness / 2)
            vmlSegments.push('xm ', 0, ',', posY)
            vmlSegments.push('l ', offsetX, ',', posY)
            vmlSegments.push('l ', offsetX, ',', posY + face.underlineThickness)
            vmlSegments.push('l ', 0, ',', posY + face.underlineThickness)
            vmlSegments.push('l ', 0, ',', posY)
            vmlSegments.push('x e')
          }

          // make sure to preserve trailing whitespace
          shape.path += vmlSegments.join('') + 'm ' + offsetX + ' 0 l ' + offsetX + ' ' + face.ascender

          return {
            element: shape,
            width: Math.floor(this.pixelsFromPoints(face, style, offsetX, 'horizontal'))
          }
        }

      }

    },

    setVectorBackend(backend) {
      this.vectorBackend = backend
      const backendFunctions = ['renderWord', 'initializeSurface', 'renderGlyph']

      for (let i = 0; i < backendFunctions.length; i++) {
        const backendFunction = backendFunctions[i]
        this[backendFunction] = this.vectorBackends[backend]['_' + backendFunction]
      }
    },

    initialize() {
      // quit if this function has already been called
      if (arguments.callee.done) { return }

      // flag this function so we don't do the same thing twice
      arguments.callee.done = true

      // kill the timer
      if (window._typefaceTimer) { clearInterval(_typefaceTimer) }

      this.renderDocument(function (e) { e.style.visibility = 'visible' })
    }

  }

  // IE won't accept real selectors...
  const typefaceSelectors = ['.typeface-js', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']

  if (document.createStyleSheet) {
    var styleSheet = document.createStyleSheet()
    for (let i = 0; i < typefaceSelectors.length; i++) {
      const selector = typefaceSelectors[i]
      styleSheet.addRule(selector, 'visibility: hidden')
    }

    styleSheet.addRule(
      '.typeface-js-selected-text',
      '-ms-filter: \
        "Chroma(color=black) \
        progid:DXImageTransform.Microsoft.MaskFilter(Color=white) \
        progid:DXImageTransform.Microsoft.MaskFilter(Color=blue) \
        alpha(opacity=30)" !important; \
      color: black; \
      font-family: Modern; \
      position: absolute; \
      white-space: pre; \
      filter: alpha(opacity=0) !important;'
    )

    styleSheet.addRule(
      '.typeface-js-vector-container',
      'position: relative'
    )
  } else if (document.styleSheets) {
    if (!document.styleSheets.length) {
      (function () {
        // create a stylesheet if we need to
        const styleSheet = document.createElement('style')
        styleSheet.type = 'text/css'
        document.getElementsByTagName('head')[0].appendChild(styleSheet)
      })()
    }

    var styleSheet = document.styleSheets[0]
    document.styleSheets[0].insertRule(typefaceSelectors.join(',') + ' { visibility: hidden; }', styleSheet.cssRules.length)

    document.styleSheets[0].insertRule(
      '.typeface-js-selected-text { \
        color: rgba(128, 128, 128, 0); \
        opacity: 0.30; \
        position: absolute; \
        font-family: Arial, sans-serif; \
        white-space: pre \
      }',
      styleSheet.cssRules.length
    )

    try {
      // set selection style for Mozilla / Firefox
      document.styleSheets[0].insertRule(
        '.typeface-js-selected-text::-moz-selection { background: blue; }',
        styleSheet.cssRules.length
      )
    } catch (e) { };

    try {
      // set styles for browsers with CSS3 selectors (Safari, Chrome)
      document.styleSheets[0].insertRule(
        '.typeface-js-selected-text::selection { background: blue; }',
        styleSheet.cssRules.length
      )
    } catch (e) { };

    // most unfortunately, sniff for WebKit's quirky selection behavior
    if (/WebKit/i.test(navigator.userAgent)) {
      document.styleSheets[0].insertRule(
        '.typeface-js-vector-container { position: relative }',
        styleSheet.cssRules.length
      )
    }
  }

  const backend = window.attachEvent && !window.opera ? 'vml' : window.CanvasRenderingContext2D || document.createElement('canvas').getContext ? 'canvas' : null

  if (backend == 'vml') {
    document.namespaces.add('v', 'urn:schemas-microsoft-com:vml', '#default#VML')

    var styleSheet = document.createStyleSheet()
    styleSheet.addRule('v\\:shape', 'display: inline-block;')
  }

  _typeface_js.setVectorBackend(backend)
  window._typeface_js = _typeface_js

  if (/WebKit/i.test(navigator.userAgent)) {
    var _typefaceTimer = setInterval(function () {
      if (/loaded|complete/.test(document.readyState)) {
        _typeface_js.initialize()
      }
    }, 10)
  }

  if (document.addEventListener) {
    window.addEventListener('DOMContentLoaded', function () { _typeface_js.initialize() }, false)
  }

  /* @cc_on @ */
  /* @if (@_win32)
  document.write("<script id=__ie_onload_typeface defer src=//:><\/script>");
  var script = document.getElementById("__ie_onload_typeface");
  script.onreadystatechange = function() {
    if (this.readyState == "complete") {
      _typeface_js.initialize();
    }
  };
  /*@end @ */

  try { console.log('initializing typeface.js') } catch (e) { };
})()

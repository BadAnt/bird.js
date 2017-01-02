const { console } = window

class Base extends HTMLElement {
  constructor() {
    super()
  }

  createdCallback() {
    this._init()
    this._rander()
  }

  attachedCallback() {
    const { attached } = this
    
    attached && attached.apply(this)
  }
  
  detachedCallback() {
    const { removed } = this

    removed && removed.apply(this)
  }

  attributeChangedCallback(name, oldVal, newVal) {
    const { attributeChanged } = this
    this._reRander(name)
    attributeChanged && attributeChanged.apply(this, name, oldVal, newVal)
  }

  _init() {
    const options = this.getOptions()
    const { template , data, created } = options

    this._tempShadow = document.createElement('div').createShadowRoot()
    this._shadow = this.createShadowRoot()
    if(!template) {
      this.template = null
      console.warn('No template!')
    } else {
      this.template = template
    }
    if(!data) {
      this.data = null
      console.warn('No data!')
    } else {
      this.data = data
    }

    this._bind()
    created && created.apply(this)
  }

  _applyDataToAttr(data) {
    for(var key in data) {
      this.setAttribute(key, JSON.stringify(data[key]))
    }
  }

  /**
   * 绑定data到Attribute
   */
  _bind() {
    const { data } = this
    this._applyDataToAttr(data)
  }

  /**
   * 操作data的方法
   */
  setData(data) {
    this.data = Object.assign(this.data, data)
    this._applyDataToAttr(data)
  }

  /**
   * 模板引擎
   */
  _parse() {
    const { template, data } = this
    var html = template.replace(/{\w*}/g, function($1){
      var key = $1.match(/\w+/)[0]
      if(typeof data[key] === 'function') {
        return 'function[' + key + ']'
      }
      if(data[key]) {
        return '${data.' + key + '}'
      }
      return ''
    })
    html = '`' + html + '`'
    try {
      html = eval(html)
    } catch(e) {
      window.console.warn(e)
    }
    return html
  }

  _rander() {
    this._shadow.innerHTML = this._parse()
    this._bindEvents()
  }

  _reRander() {
    this._tempShadow.innerHTML = this._parse()
    this._diff(this._tempShadow, this._shadow)
  }

  /**
   *  需要支持增删改
   *  1.改  done
   *  2.增
   *  3.删
   */
  _diff(newDom, oldDom) {
    if(newDom.innerHTML === oldDom.innerHTML) {
      return console.log('diff Same!')
    }
    [].forEach.call(newDom.childNodes, (el, index) => {
      if(el.innerHTML !== oldDom.childNodes[index].innerHTML) {
        if(el.childNodes.length > 1) {
          this._diff(el, oldDom.childNodes[index])
        } else {
          oldDom.childNodes[index].innerHTML = el.innerHTML
        }
      }
    })
  }

  /**
   * 绑定事件的方法，需要在rander之后执行
   */
  _bindEvents() {
    var els = this._shadow

    this._buildChildEvents(els)
  }

  _buildChildEvents(fEl) {
    [].forEach.call(fEl.childNodes, (el) => {
      if(el.attributes && el.attributes.length > 0) {
        [].forEach.call(el.attributes, (attr) => {
          var funName = attr.value.match(/function\[(\w+)\]/)
          var eventName, funText

          if(!funName || !funName[1]) {
            return
          }
          funText = this.data[funName[1]]
          eventName = attr.name.replace('on-', '').toLowerCase()
          if(funText) {
            el.addEventListener(eventName, funText.bind(this))
          }
        })  
      }
      this._buildChildEvents(el)
    })
  }

}

export default Base
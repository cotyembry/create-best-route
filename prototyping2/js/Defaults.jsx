import React from 'react';
import PropTypes from 'prop-types';


export class Button extends React.Component {
    onMouseUp(e) {
        if (typeof this.props.onMouseUp !== 'undefined') {
            this.props.onMouseUp(e);
        }
    }
    onMouseDown(e) {
        if (typeof this.props.onMouseDown !== 'undefined') {
            this.props.onMouseDown(e);
        }
    }
    onMouseMove(e) {
        if (typeof this.props.onMouseMove !== 'undefined') {
            this.props.onMouseMove(e);
        }
    }

    onTouchEnd(e) {
        if (typeof this.props.onTouchEnd !== 'undefined') {
            this.props.onTouchEnd(e);
        }
    }
    onTouchStart(e) {
        if (typeof this.props.onTouchStart !== 'undefined') {
            this.props.onTouchStart(e);
        }
    }
    onClick(e) {
        if (typeof this.props.onClick !== 'undefined') {
            this.props.onClick(e);
        }
    }
    render() {
        let _stylesPropRoot = typeof this.props.styleRoot !== 'undefined' ? { ...this.props.styleRoot } : {},
            _stylesProp = typeof this.props.style !== 'undefined' ? { ...this.props.style } : {},
            _value = typeof this.props.value !== 'undefined' ? this.props.value : '',
            _placeholder = typeof this.props.placeholder !== 'undefined' ? this.props.placeholder : '',
            _text = _value === '' ? _placeholder : _value,
            minHeight = _text === '' ? '33px' : '';

        return (
            <div style={{ ...styles.Button, ..._stylesPropRoot }}>
                <button onTouchStart={this.onTouchStart.bind(this)} onTouchEnd={this.onTouchEnd.bind(this)} onMouseDown={this.onMouseDown.bind(this)} onMouseUp={this.onMouseUp.bind(this)} onClick={this.onClick.bind(this)} placeholder={_placeholder} style={{ ...styles.ButtonChild, ..._stylesProp }}>
                    {_text}
                </button>
            </div>
        )
    }
}

export class ScrollView extends React.Component {
    render() {
        let _stylesProp = typeof this.props.style !== 'undefined' ? { ...this.props.style } : {};
        return (
            <div style={{ ...styles.ScrollView, ..._stylesProp }}>
                {this.props.children}
            </div>
        )
    }
}

export class Image extends React.Component {
    referenceCallback(eref) {
        if (typeof this.props._ref !== 'undefined') {
            this.props._ref(eref);
        }
    }
    onClick(e) {
        if(typeof this.props.onClick !== 'undefined') {
            this.props.onClick(e);
        }
    }
    onLoad(e) {
        if(typeof this.props.onLoad !== 'undefined') {
            this.props.onLoad(e);
        }
    }
    render() {
        let _className = this.props.className ? this.props.className : '',
            _stylesProp = typeof this.props.style !== 'undefined' ? { ...this.props.style } : {},
            _src = typeof this.props.src !== 'undefined' ? this.props.src : '';
        return (
            <img className={_className} onLoad={this.onLoad.bind(this)} ref={this.referenceCallback.bind(this)} src={_src} style={_stylesProp} onClick={this.onClick.bind(this)} />
        )
    }
}

Image.propTypes = {
    _ref: PropTypes.func,
    onClick: PropTypes.func,
    onLoad: PropTypes.func,
    style: PropTypes.object,
    src: PropTypes.string
}

export class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: typeof this.props.value === '' ? '' : this.props.value
        }
    }
    componentWillReceiveProps(newProps) {
        if(typeof newProps.value !== '') {
            this.setState({value: newProps.value});
        }
    }
    onInputChange(e) {
        this.setState({
            value: e.target.value
        });
        this.props.onChange(e.target.value);
    }
    render() {
        let _stylesProp = typeof this.props.style !== 'undefined' ? { ...this.props.style } : {},
            _placeholder = typeof this.props.placeholder !== 'undefined' ? this.props.placeholder : '',
            _type = typeof this.props.type !== 'undefined' ? this.props.type : '';
        return (
            <input type={_type} placeholder={_placeholder} value={this.state.value} onChange={this.onInputChange.bind(this)} style={{..._stylesProp}} />
        )
    }
}

export class Text extends React.Component {
    onClick(e) {
        if (typeof this.props.onClick !== 'undefined') {
            this.props.onClick(e);
        }
    }
    render() {
        let _stylesProp = typeof this.props.style !== 'undefined' ? { ...this.props.style } : {},
            _className = typeof this.props.className !== 'undefined' ? this.props.className : '';
        return (
            <span className={_className} style={{ ..._stylesProp }} onClick={this.onClick.bind(this)}>
                {this.props.children}
            </span>
        )
    }
}

export class View extends React.Component {
    onMouseUp(e) {
        if (typeof this.props.onMouseUp !== 'undefined') {
            this.props.onMouseUp(e);
        }
    }
    onMouseDown(e) {
        if (typeof this.props.onMouseDown !== 'undefined') {
            this.props.onMouseDown(e);
        }
    }
    onMouseMove(e) {
        if (typeof this.props.onMouseMove !== 'undefined') {
            this.props.onMouseMove(e);
        }
    }
    onTouchEnd(e) {
        if(typeof this.props.onTouchEnd !== 'undefined') {
            this.props.onTouchEnd(e);
        }
    }
    onTouchStart(e) {
        if(typeof this.props.onTouchStart !== 'undefined') {
            this.props.onTouchStart(e);
        }
    }
    referenceCallback(eref) {
        if (typeof this.props._ref !== 'undefined') {
            this.props._ref(eref);
        }
    }
    render() {
        let _stylesProp = typeof this.props.style !== 'undefined' ? { ...this.props.style } : {},
            _className = typeof this.props.className !== 'undefined' ? this.props.className : '';

        //this.props.ref is a callback function with the react reference in it so I should return the react reference and not deal with having to use `findDOMNode`
        return (
            <div onTouchStart={this.onTouchStart.bind(this)} onTouchEnd={this.onTouchEnd.bind(this)} onMouseDown={this.onMouseDown.bind(this)} onMouseUp={this.onMouseUp.bind(this)} ref={this.referenceCallback.bind(this)} className={_className.toString()} style={{ ...styles.View, ..._stylesProp }}>
                {this.props.children}
            </div>
        )
    }
}


export class CachedScrollView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listItems: [
                {
                    text: 'one'
                },
                {
                    text: 'two'
                },
                {
                    text: 'three'
                }
            ]
        }
    }
    render() {
        return (
            <div>
                {this.state.listItems.map((item, i) => {
                    <div>{item.text}</div>
                })}
            </div>
        )
    }
}



const styles = {
    Button: {
        display: 'flex',
        width: '100px',
        // minHeight: '33px',
        flexDirection: 'row',
        alignItems: 'center',
        boxSizing: 'border-box',
        backgroundColor: '#f2f2f2',
        color: 'black',
        borderRadius: '4px'
    },
    ButtonChild: {
        width: '100%',
        height: '100%',
        borderRadius: '4px'
    },
    ScrollView: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        pverflowX: 'auto',
        overflowY: 'auto'
    },
    View: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    }
}



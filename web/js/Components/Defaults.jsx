import React from 'react';



// export class View extends React.Component {
//     render() {
//         let _stylesProp = typeof this.props.style !== 'undefined' ? { ...this.props.style } : {};
//         return (
//             <div style={{ ...styles.View, ..._stylesProp }}>
//                 {this.props.children}
//             </div>
//         )
//     }
// }
export class View extends React.Component {
    referenceCallback(eref) {
        if(typeof this.props._ref !== 'undefined') {
            this.props._ref(eref);
        }
    }
    render() {
        let _stylesProp = typeof this.props.style !== 'undefined' ? { ...this.props.style } : {},
            _className = typeof this.props.className !== 'undefined' ? this.props.className : '';
        
        
        // <View ref={eref => { this.refs['TopLevelComponent'] = findDOMNode(eref) }} style={styles.CreateBestRoute}>

        //this.props.ref is a callback function with the react reference in it so I should return the react reference and not deal with having to use `findDOMNode`
        return (
            <div ref={this.referenceCallback.bind(this)} className={_className.toString()} style={{ ...styles.View, ..._stylesProp }}>
                {this.props.children}
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
    render() {
        let _stylesProp = typeof this.props.style !== 'undefined' ? { ...this.props.style } : {},
            _src = typeof this.props.src !== 'undefined' ? this.props.src : '';
        return (
            <img ref={this.referenceCallback.bind(this)} src={_src} style={_stylesProp} onClick={this.props.onClick} />
        )
    }
}
export class Text extends React.Component {
    render() {
        let _stylesProp = typeof this.props.style !== 'undefined' ? { ...this.props.style } : {};;
        return (
            <span style={{..._stylesProp}}>
                {this.props.children}
            </span>
        )
    }
}

export class Button extends React.Component {
    render() {
        let _stylesPropRoot = typeof this.props.styleRoot !== 'undefined' ? { ...this.props.styleRoot } : {},
            _stylesProp = typeof this.props.style !== 'undefined' ? { ...this.props.style } : {},
            _value = typeof this.props.value !== 'undefined' ? this.props.value : '',
            _placeholder = typeof this.props.placeholder !== 'undefined' ? this.props.placeholder : '',
            _text = _value === '' ? _placeholder : _value;
       
        return (
            <div style={{ ...styles.Button, ..._stylesPropRoot }}>
                <button onClick={this.props.onClick} placeholder={_placeholder} style={{...styles.ButtonChild, ..._stylesProp}}>
                    {_text}
                </button>
            </div>
        )
    }
}

const styles = {
    Button: {
        display: 'flex',
        width: '100px',
        minHeight: '33px',
        flexDirection: 'row',
        alignItems: 'center'
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



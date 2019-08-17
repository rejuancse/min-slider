//  Import CSS.
import './style.scss';
import './editor.scss';

import { 
    PanelBody, 
    SelectControl, 
    PanelRow, 
    FormToggle, 
    ColorPalette, 
    ColorIndicator, 
    RangeControl 
} from '@wordpress/components';
import { withState } from '@wordpress/compose';

const __ = wp.i18n.__;
const { Fragment } = wp.element;
const { MediaUpload, RichText, InspectorControls } = wp.editor;
const registerBlockType = wp.blocks.registerBlockType; 

registerBlockType( 'minslider/block-min-slider', {
title: __( 'Min Slider' ),
icon: 'shield',
category: 'common',
attributes: {
    id: {
        source: "attribute",
        selector: ".carousel.slide",
        attribute: "id"
    },
    minsliders: {
        source: "query",
        default: [],
        selector: "blockquote.minslider",
        query: {
            image: {
                source: "attribute",
                selector: "img",
                attribute: "src"
            },
            index: {
                source: "text",
                selector: "span.minslider-index"
            },
            slidertitle: {
                source: "text",
                selector: "span.minslider-text"
            },
            subtitle: {
                source: "text",
                selector: "span.minslider-subtitle span"
            },
            introtext: {
                source: "text",
                selector: ".minslider-subtitle-introtext"
            },
        }
    },
    slideralign: { type: 'string', default: 'center' },
    navon: { type: 'boolean', default: true },
    doton: { type: 'boolean', default: true }, 
    titlecolor: { type: 'string', default: '#ffffff' },
    TitleFontSize: { type: 'number', default: 42 }, 
    subtitlecolor: { type: 'string', default: '#ffffff' },
    SubtitleFontSize: { type: 'number', default: 32 },

    contentcolor: { type: 'string', default: '#ffffff' },
    contentfontsize: { type: 'number', default: 20 }, 
    
},

/*
* Edit Slider */ 
edit: props => {

    // constructor( props ) {
    //     super( props );
    //     this.keys = this.setAttributes();
    // }

    const { 
        minsliders, 
        slideralign, 
        navon, doton, 
        titlecolor, 
        TitleFontSize, 
        subtitlecolor, 
        SubtitleFontSize,
        contentcolor,
        contentfontsize
    } = props.attributes;

    if (!props.attributes.id) {
        const id = `minslider${Math.floor(Math.random() * 100)}`;
        props.setAttributes({
            id
        });
    }

    // Slider Align
    const SliderAlignControl = withState({
        slideralign: slideralign,
    })(({ slideralign, setState }) => (
        <SelectControl
            label="Select Text Align"
            value={slideralign}
            options={[
                { label: 'Center', value: 'center' },
                { label: 'Left', value: 'left' },
                { label: 'Right', value: 'right' },
            ]}
            onChange={ (value) => { props.setAttributes({ slideralign: value }) }}    
        />
    ));

    // Slider Nav.
    const NavFormToggle = withState( {
        navon: navon,
    } )( ( { navon, setState } ) => ( 
        
        <FormToggle
            id = "navEnable"
            checked={ navon }
            onChange={ () => { props.setAttributes ( { navon: ! navon }) }}
        />
    ) );

    // Dot Nav.
    const DotFormToggle = withState( {
        doton: doton,
    } )( ( { doton, setState } ) => ( 
        
        <FormToggle
            id = "dotEnable"
            checked={ doton }
            onChange={ () => { props.setAttributes ( { doton: ! doton }) }}
        />
    ) );


    /*======================================
    * Slider Style: Title
    ======================================== */ 
    // Title Color Color 
    const TitletitleColor = withState( {
        color: titlecolor,
    } )( ( { color, setState } ) => { 
        const MyColorIndicator = () => (
            <ColorIndicator colorValue = {color} />
        );
        return ( 
            <PanelRow>
                <ColorPalette
                    id="titlecolor"
                    className="color-palette-control"
                    label="Title Color" 
                    colors={ MyColorIndicator } 
                    value={ color }
                    onChange={(value) => { props.setAttributes({ titlecolor: value }) }}
                />
                <MyColorIndicator /> 
            </PanelRow>   
        ) 
    } );
    // Font size.
    const TitleFontSizeControl = withState({
        TitleFontSize: TitleFontSize,
    })(({ TitleFontSize, setState }) => (
        console.log('Font Size', TitleFontSize),
        <RangeControl
            label="Font Size"
            value={ TitleFontSize }
            onChange={( value ) => { props.setAttributes( { TitleFontSize: value } ) }}
            min={ 10 }
            max={ 150 }
        />
    ));
    
    /*======================================
    * Subtitle
    ======================================== */ 
    // Subtitle Color 
    const SubtitletitleColor = withState( {
        subtitlecolor: subtitlecolor,
    } )( ( { subtitlecolor, setState } ) => { 
        return ( 
            <PanelRow>
                <ColorPalette
                    id="titlecolor"
                    className="color-palette-control"
                    label="Sub Title Color" 
                    value={ subtitlecolor }
                    onChange={(value) => { props.setAttributes({ subtitlecolor: value }) }}
                />
                <ColorIndicator colorValue = {subtitlecolor} />
            </PanelRow>   
        ) 
    } );
    // Font size.
    const SubitleFontSizeControl = withState({
        SubtitleFontSize: SubtitleFontSize,
    })(({ SubtitleFontSize, setState }) => (
        console.log('Font Size', SubtitleFontSize),
        <RangeControl
            label="Font Size"
            value={ SubtitleFontSize }
            onChange={( value ) => { props.setAttributes( { SubtitleFontSize: value } ) }}
            min={ 10 }
            max={ 150 }
        />
    ));

    /*======================================
    * Slider Content
    ======================================== */ 
    // Content Color 
    const ContentColorControl = withState( {
        contentcolor: contentcolor,
    } )( ( { contentcolor, setState } ) => { 
        return ( 
            <PanelRow>
                <ColorPalette
                    id="titlecolor"
                    className="color-palette-control"
                    label="Sub Title Color" 
                    value={ contentcolor }
                    onChange={(value) => { props.setAttributes({ contentcolor: value }) }}
                />
                <ColorIndicator colorValue = {contentcolor} />
            </PanelRow>   
        ) 
    } );
    // Font size.
    const ContentFontSizeControl = withState({ 
        contentfontsize: contentfontsize,
    })(({ contentfontsize, setState }) => (
        console.log('Font Size', contentfontsize),
        <RangeControl
            label="Font Size"
            value={ contentfontsize }
            onChange={( value ) => { props.setAttributes( { contentfontsize: value } ) }}
            min={ 10 }
            max={ 150 }
        />
    ));


    
    /*-------------------------------------
    *               Slider Style
    --------------------------------------- */ 
    const titleStyle = {  
        color: titlecolor,
        fontSize: TitleFontSize+'px',
        fontWeight: 700,
        lineHeight: TitleFontSize+'px',
    }
     // Sub Title
    const subtitleStyle = {  
        color: subtitlecolor,
        fontSize: SubtitleFontSize+'px',
        fontWeight: 400,
        lineHeight: SubtitleFontSize+'px',
    }
    // Content
    const ContentStyle = {  
        color: contentcolor,
        fontSize: contentfontsize+'px',
        fontWeight: 700,
        lineHeight: contentfontsize+'px',
    }
    // Button 
    const buttonStyle = {  
        color: titlecolor,
        fontSize: TitleFontSize+'px',
        fontWeight: 700,
        lineHeight: 40+'px',
    }
    // End Style.
    

    const minslidersList = minsliders
    .sort((a, b) => a.index - b.index)
    .map(minslider => {
        
        return (
            <div>  
                <p>     
                    <span className="remove-minslider" 
                        onClick={() => {
                            const newMinsliders = minsliders
                            .filter(item => item.index != minslider.index)
                            .map(slider => {
                                if (slider.index > minslider.index) {
                                    slider.index -= 1;
                                }
                                return slider;
                            });
                            props.setAttributes({
                                minsliders: newMinsliders
                            });
                        }}
                        > <span className="dashicons dashicons-trash"></span>
                    </span>
                </p>  

                <div className="gts-minslider-block">
                    <blockquote className="wp-block-quote"> 
                        <div className="row">
                            <div className="gts__picture col-3">
                                <MediaUpload onSelect={
                                        media => {
                                            const image = media.sizes.full ? media.sizes.full.url : media.url;
                                            const newObject = Object.assign({}, minslider, {
                                                image: image
                                            });
                                            props.setAttributes({
                                                minsliders: [
                                                    ...minsliders.filter(
                                                    item => item.index != minslider.index
                                                    ),
                                                    newObject
                                                ]
                                            });
                                        }
                                    }
                                    type="image"
                                    value={minslider.image}
                                    render={({ open }) =>
                                        !!minslider.image ? (
                                        <div>
                                            <div className="minslider-image" style={{ textAlign: slideralign, backgroundImage: `url(${minslider.image})` }} >
                                                <div className="col-9 mt-3">
                                                    <RichText
                                                        className="slidertitle-plain-text"
                                                        tagName="h2"
                                                        style={ titleStyle }
                                                        placeholder="Heading Title Text"
                                                        value={minslider.slidertitle}
                                                        autoFocus
                                                        onChange={slidertitle => {
                                                            const newObject = Object.assign({}, minslider, { slidertitle: slidertitle });
                                                            props.setAttributes({
                                                                minsliders: [
                                                                    ...minsliders.filter(
                                                                        item => item.index != minslider.index
                                                                    ),
                                                                    newObject
                                                                ]
                                                            });
                                                        }}
                                                    />

                                                    <RichText
                                                        className="subtitle-plain-text"
                                                        tagName="h3"
                                                        style = { subtitleStyle }
                                                        placeholder="Sub Title"
                                                        value={minslider.subtitle}
                                                        onChange={subtitle => {
                                                            const newObject = Object.assign({}, minslider, {
                                                                subtitle: subtitle
                                                            });
                                                            props.setAttributes({
                                                                minsliders: [
                                                                    ...minsliders.filter(
                                                                        item => item.index != minslider.index
                                                                    ),
                                                                    newObject
                                                                ]
                                                            });
                                                        }}
                                                    />

                                                    <RichText
                                                        className="introtext-plain-text"
                                                        // tagName="p"
                                                        placeholder="Intro Text"
                                                        style = { ContentStyle }
                                                        value={minslider.introtext}
                                                        onChange={introtext => {
                                                            const newObject = Object.assign({}, minslider, {
                                                                introtext: introtext
                                                            });
                                                            props.setAttributes({
                                                                minsliders: [
                                                                ...minsliders.filter(
                                                                    item => item.index != minslider.index
                                                                ),
                                                                newObject
                                                                ]
                                                            });
                                                        }}
                                                    /> 
                                                </div>
                                            </div>  

                                            <div className="change-image">
                                                <a href="#" className="change-image" onClick={open}>Change Image </a> 
                                            </div>
                                                
                                            <div className="image-remove">
                                                {props.isSelected && (
                                                    <div className="gts__picture__actions">
                                                    <a href="#" onClick={() => {
                                                        const newObject = Object.assign(
                                                            {}, minslider, { image: null }
                                                        );
                                                        props.setAttributes({
                                                            minsliders: [
                                                            ...minsliders.filter(
                                                                item => item.index != minslider.index
                                                            ),
                                                            newObject
                                                            ]
                                                        });
                                                        }}
                                                        >
                                                        × Remove
                                                    </a>
                                                </div>
                                                )}
                                            </div>

                                        </div>
                                        ) : (
                                            <a href="#" className="minslider-image" onClick={open} >Select Image </a>
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </blockquote>
                </div>
            </div>
        );
    });

    return (
        <Fragment >
            <InspectorControls key="inspector"> 

                <PanelBody title={__('General Settings')} initialOpen={false}>
                    <SliderAlignControl />
                    <PanelRow>
                        <label htmlFor="navEnable" >
                            { ( 'Slider Navigation Enable' ) }
                        </label>
                        <NavFormToggle />
                    </PanelRow>
                    <PanelRow>
                        <label htmlFor="navEnable" >
                            { ( 'Slider Dot Enable' ) }
                        </label>
                        <DotFormToggle />
                    </PanelRow> 
                </PanelBody>

                {/* Title */}
                <PanelBody title={__('Title Setting')} initialOpen={false}>
                    <PanelRow>
                        <label htmlFor="titlecolor" >
                            { ( 'Title Text Color' ) }
                        </label>
                    </PanelRow> 
                    <TitletitleColor />
                    <TitleFontSizeControl />    
                </PanelBody>

                {/* Subtitle */}
                <PanelBody title={__('Subtitle Setting')} initialOpen={false}>
                    <PanelRow>
                        <label htmlFor="titlecolor" >
                            { ( 'SubTitle FontColor' ) }
                        </label>
                    </PanelRow> 
                    <SubtitletitleColor />
                    <SubitleFontSizeControl />
                </PanelBody>

                {/* Content */}
                <PanelBody title={__('Content Setting')} initialOpen={true}>
                    <PanelRow>
                        <label htmlFor="titlecolor" >
                            { ( 'Content FontColor' ) }
                        </label>
                    </PanelRow> 
                    <ContentColorControl />
                    <ContentFontSizeControl />
                </PanelBody>

                <PanelBody title={__('Button Setting')} initialOpen={false}>
                    
                </PanelBody>
            </InspectorControls>

            <div className={props.className}>
                {minslidersList}
                <button className="add-more-minslider" 
                    onClick={slidertitle =>
                        props.setAttributes({
                            minsliders: [
                                ...props.attributes.minsliders, 
                                {
                                    index: props.attributes.minsliders.length,
                                    slidertitle: "",
                                    subtitle: "",
                                    introtext: ""
                                }
                            ]
                        })
                    }
                    > Add Slider
                </button>
            </div>
        </Fragment>
    );
},

/**
* Save Slider
*/
save: props => {
    const { minsliders } = props.attributes;
    const minslidersList = minsliders.map(function(minslider) {
        const carouselClass = minslider.index == 0 ? ("carousel-item active") : ("carousel-item");
        return (
            <div className={carouselClass} key={minslider.index}>
                <blockquote className="minslider">
                    {minslider.slidertitle && (
                        <p className="minslider-text-container">
                            <i className="fa fa-quote-left pull-left" aria-hidden="true" />
                            <span className="minslider-text">{minslider.slidertitle}</span>
                            <i className="fa fa-quote-right pull-right" aria-hidden="true" />
                        </p>
                    )}
                
                    <div className="row">
                        {minslider.image && (
                            <div className="gts__picture col-3">
                                <img src={minslider.image} style={{ display: "none" }} />
                                <div className="minslider-image" style={{ backgroundImage: `url(${minslider.image})` }} >
                                </div>
                            </div>
                        )}
                        <div className="minslider-subtitle-container mt-3 col-9">
                            {minslider.subtitle && (
                                <p className="minslider-subtitle-name">
                                    <span className="minslider-subtitle">
                                        <span>{minslider.subtitle}</span>
                                    </span>
                                </p>
                            )}
                            {minslider.introtext && (
                                <span className="minslider-subtitle-introtext">
                                {minslider.introtext}
                                </span> 
                            )}
                        </div>
                    </div>
                </blockquote>
            </div>
        );
    });

    if (minsliders.length > 0) {
        return (
            <div className="minslider-slider">
                {minslidersList}
            </div>
        );
    } else return null;
} // End Save.
	
	

} );

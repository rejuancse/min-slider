import { PanelBody } from '@wordpress/components';
import { withState } from '@wordpress/compose';

const { Fragment, Component } = wp.element;
const { MediaUpload, RichText, InspectorControls } = wp.editor;

class Edit extends Component {
    render() {
        // const { posts } = this.props
        // const { 
        //     attributes: { 
        //         padding,
        //     }, setAttributes 
        // } = this.props

        const { minsliders } = props.attributes;

        if (!props.attributes.id) {
            const id = `minslider${Math.floor(Math.random() * 100)}`;
            props.setAttributes({
                id
            });
        }

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
                            > <span class="dashicons dashicons-trash"></span>
                        </span>
                    </p>  

                    <div className="gts-minslider-block">
                        <blockquote className="wp-block-quote"> 
                        <div className="row">
                        <div className="gts__picture col-3">
                            <MediaUpload onSelect={media => {
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
                            }}
                            type="image"
                            value={minslider.image}
                            render={({ open }) =>
                                !!minslider.image ? (
                                <div>
                                    <div className="minslider-image" style={{ backgroundImage: `url(${minslider.image})` }} >
                                        <div className="col-9 mt-3">
                                            <RichText
                                                className="slidertitle-plain-text"
                                                tagName="h2"
                                                style={{ height: 58 }}
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
                                                placeholder="Intro Text"
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
                    <PanelBody title={__('Slider Settings')} initialOpen={false}>
                        {/* <TitleColorPalette /> */}
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
        

    }
}

(Edit)
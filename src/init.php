<?php
/**
* Blocks Initializer
*
* Enqueue CSS/JS of all the blocks.
*
* @since   1.0.0
*/

# Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
* Enqueue Gutenberg block assets for both frontend + backend.
*/
function min_slider_block_assets() { 
	wp_register_style(
		'min-slider-style-css', // Handle.
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ),
		array( 'wp-editor' ),
		null 
	);

	// Register block editor script for backend.
	wp_register_script(
		'min-slider-block-js', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
		null,
		true
	);

	// Register block editor styles for backend.
	wp_register_style(
		'min-slider-block-editor-css',
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ),
		array( 'wp-edit-blocks' ),
		null 
	);

	/**
	* Register Gutenberg block on server-side.
	*/
	register_block_type(
		'minslider/block-min-slider', array(
			'style'         => 'min-slider-style-css',
			'editor_script' => 'min-slider-block-js',
			'editor_style'  => 'min-slider-block-editor-css',
		)
	);


}

// Hook: Block assets.
add_action( 'init', 'min_slider_block_assets' );

/**
 * @license Copyright (c) 2014-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor.js';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment.js';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat.js';
import AutoImage from '@ckeditor/ckeditor5-image/src/autoimage.js';
import AutoLink from '@ckeditor/ckeditor5-link/src/autolink.js';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote.js';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold.js';
import Code from '@ckeditor/ckeditor5-basic-styles/src/code.js';
import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock.js';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials.js';
import Heading from '@ckeditor/ckeditor5-heading/src/heading.js';
import Image from '@ckeditor/ckeditor5-image/src/image.js';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption.js';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle.js';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar.js';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload.js';
import Indent from '@ckeditor/ckeditor5-indent/src/indent.js';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic.js';
import Link from '@ckeditor/ckeditor5-link/src/link.js';
import List from '@ckeditor/ckeditor5-list/src/list.js';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed.js';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph.js';
import Table from '@ckeditor/ckeditor5-table/src/table.js';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar.js';

import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

class Thumbnail extends Plugin {
    init() {
        const editor = this.editor;

        // The button must be registered among the UI components of the editor
        // to be displayed in the toolbar.
        editor.ui.componentFactory.add( 'thumbnail', () => {
            // The button will be an instance of ButtonView.
            const button = new ButtonView();

            button.set( {
                label: 'Thumbnail',
                withText: true
            } );
            

            button.on( 'execute', () => {
                const imageUtils = editor.plugins.get( 'ImageUtils' );
                let imageElement = imageUtils.getClosestSelectedImageElement( editor.model.document.selection );
                const range = editor.model.createRangeIn( editor.model.document.getRoot() );

                for ( const value of range.getWalker( { ignoreElementEnd: true } ) ) {
                    if(value.item.hasAttribute('thumbnail')) {
                        editor.model.change(writer => {
                            writer.removeAttribute('thumbnail', value.item)
                        });
                    }
                }
                
                editor.model.change(writer => {
                    writer.setAttribute('thumbnail', true, imageElement)
                })
            } );

            return button;
        } );
    }
}

class Editor extends ClassicEditor {}

// Plugins to include in the build.
Editor.builtinPlugins = [
	Alignment,
	Autoformat,
	AutoImage,
	AutoLink,
	BlockQuote,
	Bold,
	Code,
	CodeBlock,
	Essentials,
	Heading,
	Image,
	ImageCaption,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	Indent,
	Italic,
	Link,
	List,
	MediaEmbed,
	Paragraph,
	Table,
	TableToolbar,
    Thumbnail
];

// Editor configuration.
Editor.defaultConfig = {
	toolbar: {
		items: [
			'heading',
			'|',
			'bold',
			'italic',
			'alignment',
			'|',
			'link',
			'bulletedList',
			'numberedList',
			'|',
			'outdent',
			'indent',
			'|',
			'insertTable',
			'|',
			'undo',
			'redo',
			'-',
			'imageUpload',
			'blockQuote',
			'mediaEmbed',
			'|',
			'code',
			'codeBlock'
		],
		shouldNotGroupWhenFull: true
	},
	language: 'ko',
	image: {
		toolbar: [
			'imageTextAlternative',
			'toggleImageCaption',
			'imageStyle:inline',
			'imageStyle:block',
			'imageStyle:side',
            'Thumbnail'
		]
	},
	table: {
		contentToolbar: [
			'tableColumn',
			'tableRow',
			'mergeTableCells'
		]
	}
};

export default Editor;

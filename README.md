# Situatuional Images
## Description
This is just funny small aplication without any deep ideas :)

This is small application for storing images by tags with easy way to copy image path to buffer (e.g. for future inserting in the social networks)

## Technology
* ES6 with Webpack + Babel.
* Instead of server side simple jsons are using
* Third party code is used for grid (`flex_masonry`) 

## Commands
* `npm run build` will build your application, after that you can use files from `public` as you production build
* `npm run dev` will start development autoreload server for this app

## Structure
All packs of images should have strictly definitions and should be stored in the `public/packs` folder.

At the root of `public/packs` `all.json` file should be stored. This file contains array of all available packs in the next format: 
````
[{
    "pack": "NAME_OF_THE_FOLDER_WITH_PACK",
    "logo": "PREVIEW_IMAGE_FROM_PACK_FOLER",
    "description": "SHORT_DESCRIPTION_OF_PACK"
}]
````

All packs should have similar structure, you can find example below:
````
- images (folder)
- bg.jpg (file)
- preview.jpg (file)
- pack.description.json (file)
````
The main information about pack stored in the `pack.description.json` and have next structure: 
````
{
    "logo": "preview.jpg",
    "bg": "bg.jpg",
    "images": [{
        "src": "images/1.jpg",
        "description": "ANY",
        "tags": ["TAG_1", "TAG_2", "TAG_3"]
    }
}
````

## Demo
[Live Demo](https://test.webtech.by/situational-images/)
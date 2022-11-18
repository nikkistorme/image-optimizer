# Image Optimizer

## Getting Started

Once you have the code, follow these steps to get started:

1. Install the dependencies: `npm install`
2. Create a parameter file: `npm run init-params`
3. Edit the parameter file to set the [parameters](#parameters) for your optimization.
4. Place the images you want to optimize in directory specified in the parameters.
5. Run the report: `npm run optimize`

## Parameters

There are several parameters that can be set in the `params.json` file. The parameters are:

| Name                         | Type     |
| ---------------------------- | -------- |
| [input](#input-object)       | `Object` |
| [output](#output-object)     | `Object` |
| [resize](#resize-object)     | `Object` |
| [compress](#compress-object) | `Object` |

### `input: Object`

The `input` parameter is an Object for specifying options for the input images. For example:

```json
"input": {
  dir: "./input-images",
}
```

#### Options

| Name | Type     | Description                                                                  |
| ---- | -------- | ---------------------------------------------------------------------------- |
| dir  | `string` | The path to the desired input directory. Accepts any subdirectory structure. |

### `output: Object`

The `output` parameter is an Object for specifying options for the output (optimized) images. For example:

```json
"output": {
  dir: "./output-images",
}
```

#### Options

| Name | Type     | Description                                                                   |
| ---- | -------- | ----------------------------------------------------------------------------- |
| dir  | `string` | The path to the desired output directory. Accepts any subdirectory structure. |

### `resize: Object`

The `resize` parameter is an Object for specifying options for resizing the images. For example:

```json
  resize: {
    enabled: false,
    sizes: [600, 900, 1200, 2400],
  },
```

#### Options

| Name    | Type       | Description                                                     |
| ------- | ---------- | --------------------------------------------------------------- |
| enabled | `boolean`  | Whether or not to resize the images.                            |
| sizes   | `number[]` | The sizes to resize the images to. Accepts any number of sizes. |

### `compress: Object`

The `compress` parameter is an Object for specifying options for compressing the images. For example:

```json
  compress: {
    quality: 65,
  },
```

#### Options

| Name    | Type     | Description                                                                 |
| ------- | -------- | --------------------------------------------------------------------------- |
| quality | `number` | The quality of the compressed images. Accepts any number between 0 and 100. |

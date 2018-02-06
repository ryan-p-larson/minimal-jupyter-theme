// leave at least 2 line with only a star on it below, or doc generation fails
/**
 *
 *
 * Minimal Jupyter Theme
 *
 * custom.js
 *
 *
 * @module IPython
 * @namespace IPython
 * @class customjs
 * @static
 */


/**
  * @method
  * @description Function to format an Jupyter/IPython cell prompt to cut down on cruft.
  * @param {value} Int [1+] denoting the order in which the cell was fired.
  * @param {lines_number} Int [0+] denoting how many lines of code cell has.
  * @returns HTML formatted input prompt [<1 &nbsp;>, <&nbsp;>]
  */
function input_cell_format(value, lines_number) {
    if (value === undefined || value === null) {
        return '&nbsp;'
    } else if (value === '*') {
        return '&nbsp;'
    } else {
        return value + '.&nbsp;';
    }
}

// On startup assign our custom function to Jupyter,
// and parse the existing prompts to conform to our style.
define(['base/js/namespace', 'base/js/events', 'notebook/js/codecell'], function (jupyter, events, cell) {

	/* Force our inputs to use our formatting function */
    cell.CodeCell.input_prompt_function = input_cell_format;
    cell.CodeCell.input_prompt_continuation = input_cell_format;

    /* Once the kernel is ready we can change the input prompts*/
    events.on("kernel_ready.Kernel", function () {

    	// Select all the input prompts 
    	var prompts = $('div.prompt.input_prompt').toArray();

    	// For each, extract the number and change the text
    	prompts.forEach(function(d) {
    		var prompt_text = d.innerText;
    		var prompt_num = /\d/.test(prompt_text) ? prompt_text.match(/\d+/g)[0] + "." : "";

    		// Set the innerText
    		d.innerHTML = '&nbsp;' + prompt_num + ' &nbsp;';
    	})
    });
});

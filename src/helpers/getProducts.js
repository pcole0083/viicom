export default function getProducts() {
	var getDataFromHidden = function(inputId){
        var hiddenInput = document.querySelector(inputId);
        if(!hiddenInput){
            console.warn('Input '+inputId+' not found!');
            return null;
        }
        return hiddenInput.value;
    };

    var stringToJSON = function(stringData){
        if(!stringData){
            console.warn('stringData is type: '+ typeof(stringData));
            return null;
        }
        return JSON.parse(stringData);
    };

    var testFlag = true;
    var items = {};
    if(!!testFlag){
    	items = {
    		"8": {
	    		id: '1001',
	    		name: 'Painter\'s Easel',
	    		sku: 'TEST1001',
	    		price: 10.00,
	    		imgURL: 'easel.png',
	    		product_subtotal: 100.00 
	    	},
	    	"12": {
	    		id: '2002',
	    		name: 'Tape Deck',
	    		sku: 'TEST2002',
	    		price: 20.00,
	    		imgURL: 'tapedeck.png',
	    		product_subtotal: 200.00 
	    	}
	    };
    }
    else {
    	items = stringToJSON(getDataFromHidden('#itemsData'));
    }

	return items;
}
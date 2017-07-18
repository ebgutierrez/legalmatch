$(document).ready(function() {
    lineclamp();
    createCategory();
});

$( window ).resize(function() {
    lineclamp();
});

/*Clam comment on reviews*/
var lineclamp = function () {
    var lineheight = parseFloat($('.content').css('line-height'));
    var articleheight = 45; 
    var calc = parseInt(articleheight/lineheight);

    console.log('calc', calc);
    $(".content").css({
    "-webkit-line-clamp": "" + calc + ""
    });
};

/*Display dropdown categories*/
var createCategory = function() {
    var catEl = document.getElementById('category'), 
        cat, property, option;

    option = '<option value="" disabled selected>Click to choose a legal category</option>';
    
    for( property in category ) {
        cat = category[property];
        option += '<option value="' + cat.value + '">' + cat.name + '</option>';
    }

    catEl.innerHTML = option;
}

var keyUpTimeout = null;
var selectedCat = '';

/*show dropdown zipcode result*/
var showDrowpDownZip = function() {
    var element = document.getElementById('zip'),
        div, html, location, value;

    if( keyUpTimeout ) {
        clearTimeout( keyUpTimeout );
    }

    keyUpTimeout = setTimeout(function(){
        div = document.getElementById('result-location');

        value = element.value;

        if( value ) {
            location = getLocation( element.value );

            div.style.display = 'block';

            if( location ) {
                html = location.place + ' ' + '<span class=\'search\'>' + location.zipcode + '</span>';
            } else {
                html = 'Location not found';
            }

            div.innerHTML = html;
        } else {
            div.style.display = 'none';
        }

    },800);
};


/*get location*/
var getLocation = function( value ) {
    var property;
    for( property in zipcode ) {
        if( zipcode[property].zipcode === value ) {
            return zipcode[property];
        }
    }
};

/*on selection of category, show sub cateogires*/
var changeFunc = function( value ) {
    selectedCat = value;
    showSubCategory();
}

/*show sub category*/
var showSubCategory = function() {
    var selectedCatElem = document.getElementById('selectedCat'),
        screen          = document.getElementById('screen'),
        subcat          = document.getElementById('subcat'),
        checkgroup      = document.getElementById('checkgroup'),
        html            = '',
        _category,
        subcategories,
        subcategory,
        property;

    _category = findCategory();


    screen.style.display = 'block';
    subcat.style.display = 'block';

    selectedCatElem.innerHTML = _category.name;

    subcategories = _category.subcategory;

    for( property in subcategories ) {
        subcategory = subcategories[property];
        console.log('subcategory',subcategory);

        if(subcategory) {
            html += '<div><input type="checkbox" name="subcat" value="' + subcategory.value + '" >' + subcategory.name + '</div>';    
        }
        
    }

    checkgroup.innerHTML = html;
}


/*look for seelected category to get subcategory*/
var findCategory = function() {
    var property, cat;

    for( property in category ) {
        cat = category[property];
        if( cat.value === selectedCat ) {
            return cat;
        }
    }
}

/*close modal*/
var closeModal = function() {
    var screen = document.getElementById('screen'),
        subcat = document.getElementById('subcat');

    screen.style.display = 'none';
    subcat.style.display = 'none';
}
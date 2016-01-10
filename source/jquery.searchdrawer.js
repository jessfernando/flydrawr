;(function($){

    var defaults = {

    };

    $.fn.flyDrawer = function(opts){

        $.extend(search.options, defaults, opts);

        init(this);

        return {
            blockToggle : search.blockToggle
        }
    };

    var search = {
        $element: null,
        selectors : {
            elementId: null,
            input : null,
            button : null,
            body : 'body',
            bodyIsOpen:null,
            mimic: null
        },
        blockToggle : false,
        isOpen : false,
        options: null
    };


    function init($el){

        s = search;


        if(!$el.attr('id')){
            console.log('flydrawr: no id on element');
            return;
        }
        search.selectors.elementId = $el.attr('id');

        search.$element = $el;

        search.$element.data("data-flydrawr","");



        createSearchChildElements();

        setSelectors();

        attachEvents();
    }

    function setSelectors(id){
        $.extend(search.selectors, {
            button : '[data-flydrawr-id='+ search.selectors.elementId +']',
            input : '#' + search.selectors.elementId + ' .flydrawr-search-input',
            body : 'body',
            bodyIsOpen: 'flydrawr-open-'+ search.selectors.elementId ,
            mimic: '#' + search.selectors.elementId + ' .flydrawr-search-mimic span'
        });

        //
    }

    function createSearchChildElements(){
        search.$element.addClass("flydrawr-search-box");

        var inputField = '<input type="text" data-flydrawr-input="'+
            search.selectors.elementId + '" class="flydrawr-search-input">';
        var searchMimic = '<div class="flydrawr-search-mimic"><span></span></div>';

        var $childElements = $('<div>' + inputField + searchMimic + '</div>');

        search.$element.append($childElements);

    }

    function attachEvents(){

        // Toggle
        $(search.selectors.button).on('click', toggleDrawer.bind(this));

        $(search.selectors.input).on('focus', addBlurEvent); //fly:finishedOpening

        // Finished closing
        search.$element.on('fly:finishedClosing', removeBlurEvent);

        // Mirroring for search icon positioning within input
        $(search.selectors.input).on('keydown', mirrorInputValue);
        $(search.selectors.input).on('keyup', mirrorInputValue);
        $(search.selectors.input).on('keyup', closeOnEscapePress);


        function addBlurEvent(){
            console.log('add blur');
            $(document).on('click', onFieldBlur);
        }

        function removeBlurEvent(){
            console.log('remove blur');
            $(search.selectors.input).off('blur');
        }

        function onFieldBlur(e){

            // if not click away
            var $target=$(e.target);
            if( $target.is(search.$element)
                || $target.is($(search.selectors.input)) ) return;

            console.log('toggle:blur');

            // if not toggle blocked
            if(!search.isOpen || search.blockToggle) return;

            toggleDrawer();
        }

        function mirrorInputValue(){
            $(search.selectors.mimic).html($(this).val());
        }

        function closeOnEscapePress(e){
            if (e.keyCode != 27) return;

            toggleDrawer();
        }

    }


    function toggleDrawer(e){

        console.log('throttle');

        // If toggle is blocked, do nothing
        if(search.blockToggle) return;

        // Block toggle to throttle during animation
        search.blockToggle = true;

        // Toggle and wait until animation finsishes
        doToggle(e).then(function(){

            // Enable toggle
            search.blockToggle = false;

            // Publish event
            if(search.isOpen){
                search.$element.trigger('fly:finishedOpening');
            }else{
                search.$element.trigger('fly:finishedClosing');
            }
        });

        return;

        function doToggle(e){

            var isOpening = !search.isOpen;
            var $deferred = new $.Deferred();

             console.log('toggle:' +  (isOpening?'open':'close'));
            //if(e) console.log(e.target);


            if(isOpening){
                $(search.selectors.body).addClass(search.selectors.bodyIsOpen);
               // $(search.selectors.button).addClass('open'); //refactr css
                //$(search.selectors.body).addClass('search-open');

                $(search.selectors.input).eq(0).focus();
            }else{
                $(search.selectors.body).removeClass(search.selectors.bodyIsOpen);
                //$(search.selectors.button).removeClass('open');
                //$(search.selectors.body).addClass('search-open');
            }


            setTimeout(function(){
                search.isOpen = isOpening;
                $deferred.resolve();
            }.bind(this), 600); //needed?

            return $deferred;
        }
    }


})(jQuery);


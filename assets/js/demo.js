$(function () {

    // this is for the appbar-demo page
    if ($("#appbar-theme-select").length) {
        $("#appbar-theme-select").change(function () {
            var ui = $(this).val();

            if (ui != '')
                $("footer.win-commandlayout")
                    .removeClass("win-ui-light win-ui-dark")
                    .addClass(ui);
        });
    }


    // style switcher
    if ($("#win-theme-select").length) {
        $("#win-theme-select").change(function () {
            var css = $(this).val();

            if (css != '')
                updateCSS(css);
        });
    }


    $("#settings").click(function (e) {
        e.preventDefault();
        $('#charms').charms('showSection', 'theme-charms-section');
    });


    // listview demo
    $('#listview-grid-demo').on('click', '.mediumListIconTextItem', function (e) {
        e.preventDefault();
        $(this).toggleClass('selected');
    });

    $('.timepicker').timepicker({
        minuteStep: 1,
        template: 'modal',
        showSeconds: true,
        showMeridian: false,
        modalBackdrop: true
    });

    $('.inline-editable').editable({
        type: 'text',
        pk: 1,
        url: '/post',
        title: 'Enter a value'
    });


    //$('#home-carousel').carousel({interval: 5000});

});


//function to append a new theme stylesheet with the new style changes
function updateCSS(css) {

    $("head").append('<link rel="stylesheet" type="text/css" href="/assets/css/' + css + '.css">');

    if ($("link[href*=metro-ui-]").size() > 1) {
        $("link[href*=metro-ui-]:first").remove();
    }

}


// NOTICE!! DO NOT USE ANY OF THIS JAVASCRIPT
// IT'S ALL JUST JUNK FOR OUR DOCS!
// ++++++++++++++++++++++++++++++++++++++++++

!function ($) {

    $(function () {

        var $window = $(window);

        // Disable certain links in docs
        $('section [href^=#]').click(function (e) {
            e.preventDefault()
        });

        // side bar
        $('.bs-docs-sidenav').affix({
            offset: {
                top: function () {
                    return $window.width() <= 980 ? 290 : 210
                }, bottom: 270
            }
        });

        // make code pretty
        window.prettyPrint && prettyPrint();

        // add-ons
        $('.add-on :checkbox').on('click', function () {
            var $this = $(this)
                , method = $this.attr('checked') ? 'addClass' : 'removeClass'
            $(this).parents('.add-on')[method]('active')
        });

        // add tipsies to grid for scaffolding
        if ($('#gridSystem').length) {
            $('#gridSystem').tooltip({
                selector: '.show-grid > div', title: function () {
                    return $(this).width() + 'px'
                }
            });
        }

        // tooltip demo
        $('.tooltip-demo').tooltip({
            selector: "a[rel=tooltip]"
        });

        $('.tooltip-test').tooltip();
        $('.popover-test').popover();

        // popover demo
        $("a[rel=popover]")
            .popover()
            .click(function (e) {
                e.preventDefault();
            });

        // button state demo
        $('#fat-btn')
            .click(function () {
                var btn = $(this);
                btn.button('loading');
                setTimeout(function () {
                    btn.button('reset')
                }, 3000);
            });

        // carousel demo
        $('#myCarousel').carousel();

        // javascript build logic
        var inputsComponent = $("#components.download input"),
            inputsPlugin = $("#plugins.download input"),
            inputsVariables = $("#variables.download input")

        // toggle all plugin checkboxes
        $('#components.download .toggle-all').on('click', function (e) {
            e.preventDefault()
            inputsComponent.attr('checked', !inputsComponent.is(':checked'))
        });

        $('#plugins.download .toggle-all').on('click', function (e) {
            e.preventDefault()
            inputsPlugin.attr('checked', !inputsPlugin.is(':checked'))
        });

        $('#variables.download .toggle-all').on('click', function (e) {
            e.preventDefault()
            inputsVariables.val('')
        });

        // request built javascript
        $('.download-btn').on('click', function () {

            var css = $("#components.download input:checked")
                    .map(function () {
                        return this.value
                    })
                    .toArray()
                , js = $("#plugins.download input:checked")
                    .map(function () {
                        return this.value
                    })
                    .toArray()
                , vars = {}
                , img = ['glyphicons-halflings.png', 'glyphicons-halflings-white.png']

            $("#variables.download input")
                .each(function () {
                    $(this).val() && (vars[ $(this).prev().text() ] = $(this).val())
                });

            $.ajax({
                type: 'POST', url: /\?dev/.test(window.location) ? 'http://localhost:3000' : 'http://bootstrap.herokuapp.com', dataType: 'jsonpi', params: {
                    js: js, css: css, vars: vars, img: img
                }
            });
        });
    });

    // Modified from the original jsonpi https://github.com/benvinegar/jquery-jsonpi
    $.ajaxTransport('jsonpi', function (opts, originalOptions, jqXHR) {
        var url = opts.url;

        return {
            send: function (_, completeCallback) {
                var name = 'jQuery_iframe_' + jQuery.now()
                    , iframe, form

                iframe = $('<iframe>')
                    .attr('name', name)
                    .appendTo('head')

                form = $('<form>')
                    .attr('method', opts.type) // GET or POST
                    .attr('action', url)
                    .attr('target', name)

                $.each(opts.params, function (k, v) {

                    $('<input>')
                        .attr('type', 'hidden')
                        .attr('name', k)
                        .attr('value', typeof v == 'string' ? v : JSON.stringify(v))
                        .appendTo(form)
                });

                form.appendTo('body').submit()
            }
        }
    });

    var spinnerOptions = {
        lines: 17,
        length: 7,
        width: 4,
        radius: 22,
        corners: 1,
        rotate: 60,
        direction: 1,
        color: '#fff',
        speed: 0.7,
        trail: 38,
        shadow: false,
        hwaccel: false,
        className: 'spinner',
        zIndex: 2e9,
        top: 'auto',
        left: 'auto'
    };

    $(".metro").metro();
    $('#reportrange').daterangepicker(
        {
            ranges: {
                'Today': ['today', 'today'],
                'Yesterday': ['yesterday', 'yesterday'],
                'Last 7 Days': [Date.today().add({ days: -6 }), 'today'],
                'Last 30 Days': [Date.today().add({ days: -29 }), 'today'],
                'This Month': [Date.today().moveToFirstDayOfMonth(), Date.today().moveToLastDayOfMonth()],
                'Last Month': [Date.today().moveToFirstDayOfMonth().add({ months: -1 }), Date.today().moveToFirstDayOfMonth().add({ days: -1 })]
            },
            opens: 'left',
            format: 'MM/dd/yyyy',
            separator: ' to ',
            startDate: Date.today().add({ days: -29 }),
            endDate: Date.today(),
            minDate: '01/01/2012',
            maxDate: '12/31/2013',
            locale: {
                applyLabel: 'Submit',
                fromLabel: 'From',
                toLabel: 'To',
                customRangeLabel: 'Custom Range',
                daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                firstDay: 1
            },
            showWeekNumbers: true,
            buttonClasses: ['btn-danger']
        },
        function (start, end) {
            $('#reportrange span').html(start.toString('MMMM d, yyyy') + ' - ' + end.toString('MMMM d, yyyy'));
        }
    );

    //Set the initial state of the picker label
    $('#reportrange span').html(Date.today().add({ days: -29 }).toString('MMMM d, yyyy') + ' - ' + Date.today().toString('MMMM d, yyyy'));

    $('#myTab a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });

}(window.jQuery);
define([
    'jquery',
    'underscore',
    'backbone',
    'bootMetro',
    'bootMetroCharms',
    'mediator',
    'models/material/MaterialModel',
    'views/hub/modules/site/modelViews/ListViewBySiteModelCollection',
    'text!/templates/hub/modules/site/site_list.html',
    'i18n!views/hub/modules/site/nls/list'
], function ($, _, Backbone, MetroUi, BootMetroChams, Mediator, MaterialModel, ListViewBySiteModelCollection, eltTemplate, I18nObject) {
    var erp = window.Erp,
        containerSel = "#listBySite",
        mediator = erp.mediator,
        ListViewBySite = Backbone.View.extend({
            el: $("#listBySite"),
            initialize: function () {
                var view = this,
                    elt = $(this.el);

                _.extend(elt, Backbone.StateMachine, Backbone.Events, {
                    states: {
                        'ready': {enter: ['prepare', 'doLoad'], leave: []},
                        'visible': {enter: ['doShow'], leave: ['doUnload']},
                        'hidden': {enter: ['doHide'], leave: ['doLoad']},
                        'disposed': {enter: ['dispose'], leave: []}
                    },
                    transitions: {
                        'init': {
                            'initialized': {
                                enterState: 'ready',
                                triggers: 'site:list:viewbydate:ready',
                                callbacks: ['listViewBySiteReadyStateReached']
                            }
                        },
                        'visible': {
                            'hide': {
                                enterState: 'hidden',
                                triggers: 'site:list:viewbydate:show'
                            }
                        },
                        'hidden': {
                            'show': {
                                enterState: 'visible',
                                triggers: 'site:list:viewbydate:hide'
                            }
                        }
                    },
                    prepare: function () {
                        mediator.subscribe('site:list:tab:change', function (data) {
                            var target = data.destination;
                            if (target == containerSel) {
                                elt.trigger('show');
                            } else {
                                elt.trigger('hide');
                            }
                        });

                        // create the collection to embed items.
                        var materials = [
                            {
                                id: 1,
                                date: '2013-02-11',
                                code: "02",
                                label: "Pose element de plafond",
                                quantity: 1,
                                unit: 'pce',
                                price: 180.00,
                                subtotal: 180
                            },
                            {
                                id: 2,
                                date: '2013-02-11',
                                code: "05",
                                label: "Pose chambranle",
                                quantity: 2,
                                unit: 'pce',
                                price: 70.00,
                                subtotal: 140
                            },
                            {
                                id: 1,
                                date: '2013-02-11',
                                code: "08",
                                label: "Taille poutre",
                                quantity: 20,
                                unit: 'pce',
                                price: 20.00,
                                subtotal: 400
                            }
                        ], collection = new ListViewBySiteModelCollection(
                            {
                                // assign the initial collection
                                collection: materials,
                                // assign the container for the list.
                                el: $("table.erp-listing", containerSel)
                            });

                        collection.render();
                        // TODO : add this method to the right view (list item view)
                        /*mediator.subscribe("nav:bottom:add:click", function() {
                         view.createItem(elt);
                         });*/
                    },
                    dispose: function () {
                        mediator.off('site:list:tab:change');
                    },
                    doShow: function () {
                    },
                    doUnload: function () {
                        // unload process will check if any non persisted changes still exists
                    },
                    doHide: function () {
                        // hide the element.
                        if ($(this.el).is(":visible")) {
                            $(this.el).hide();
                        }
                    },
                    doLoad: function () {

                    },
                    listViewBySiteReadyStateReached: function () {
                    }
                });
                elt.startStateMachine({debugStateMachine: false});
                elt.trigger('initialized');
                //erp.viewManager.push(Erp.ViewNames.SITE_MANAGER_LIST_VIEW, this);
            },
            render: function () {
                var tpl,
                // (?<label>\w+)\s*\:\s*\"(?<name>[^\"]+)"
                    vars = {
                        site: I18nObject.site_label,
                        help_label: I18nObject.help_label,
                        site_input_placeholder: I18nObject.site_input_placeholder,
                        date_table_header: I18nObject.date_table_header,
                        code_table_header: I18nObject.code_table_header,
                        label_table_header: I18nObject.label_table_header,
                        quantity_table_header: I18nObject.quantity_table_header,
                        unit_table_header: I18nObject.unit_table_header,
                        price_table_header: I18nObject.price_table_header,
                        total_table_header: I18nObject.total_table_header,
                        action_table_header: I18nObject.action_table_header,
                        date_label_placeholder: I18nObject.date_label_placeholder,
                        code_label_placeholder: I18nObject.code_label_placeholder,
                        label_label_placeholder: I18nObject.label_label_placeholder,
                        quantity_label_placeholder: I18nObject.quantity_label_placeholder,
                        unit_label_placeholder: I18nObject.unit_label_placeholder,
                        price_label_placeholder: I18nObject.price_label_placeholder,
                        subtotal_label_placeholder: I18nObject.subtotal_label_placeholder,
                        site_label: I18nObject.site_label,
                        subsite_label: I18nObject.subsite_label,
                        concern_label: I18nObject.concern_label,
                        client_label: I18nObject.client_label,
                        subsite_input_placeholder : I18nObject.subsite_input_placeholder,
                        client_input_placeholder : I18nObject.client_input_placeholder,
                        concern_input_placeholder : I18nObject.concern_input_placeholder
                    }
                //this.$el.html(eltTemplate);
                tpl = _.template(eltTemplate, vars);
                $(containerSel).html(tpl);
                mediator.publish("site:list:bysite:rendering:complete");
            }
        });
    return ListViewBySite;
});

/*
 <tr>
 <td class="align-center">
 <label class="checkbox">
 <input type="checkbox"><span class="metro-checkbox"></span>
 </label>
 </td>
 <td>
 <div id="materialSelectDateWidget_1" data-date-format="dd-mm-yyyy" class="input-append date">
 <input type="text" data-date="" name="material_date[]" id="materialDateImput_1"/>
 <span class="add-on">
 <i class="icon-calendar" data-time-icon="icon-time" data-date-icon="icon-calendar"></i>
 </span>
 </div>
 </td>
 <td>
 <input type="text" name="materialCode[]" id="materialCodeInput_1" placeholder="<%= code_label_placeholder %>" />
 </td>
 <td>
 <textarea name="materialLabel[]" id="materialLabelInput_1" placeholder="<%= label_label_placeholder %>"></textarea>
 </td>
 <td>
 <input type="text" name="materialQuantity[]" id="materialQunantityInput_1" placeholder="<%= quantity_label_placeholder %>"/>
 </td>
 <td>
 <input type="text" name="materialUnit[]" id="materialUnitInput_1" placeholder="<%= unit_label_placeholder %>"/>
 </td>
 <td>
 <input type="text" name="materialUnitPrice" id="materialUnitPriceInput_1" placeholder="<%= price_label_placeholder %>"/>
 </td>
 <td>
 <input type="text" name="materialSubtotal" id="materialSubtotalInput_1"  placeholder="<%= subtotal_label_placeholder %>"/>
 </td>
 <td>
 <a href="#" class="btn btn-small">
 <i class="icon-search"></i>
 </a>
 <a href="#" class="btn btn-small">
 <i class="icon-report">&#x0038;</i>
 </a>
 <a class="btn btn-small" href="#">
 <i class="icon-edit">&#xe164;</i>
 </a>
 <a class="action delete btn btn-small" data-toggle="modal" href="#deleteConfirm"
 data-target="#deleteConfirm">
 <i class="icon-remove"></i>
 </a>
 </td>
 </tr>*/
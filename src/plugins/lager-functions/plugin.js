/*!
 * jQuery QueryBuilder Bootstrap Selectpicker
 * Applies Bootstrap Select on filters and operators combo-boxes.
 */

/**
 * @throws ConfigError
 */
QueryBuilder.define('lager-functions', function(options) {
    if (!$.fn.selectpicker || !$.fn.selectpicker.Constructor) {
        Utils.error('MissingLibrary', 'Bootstrap Select is required to use "bt-selectpicker" plugin. Get it here: http://silviomoreto.github.io/bootstrap-select');
    }

    this.on('getRuleInput.filter', function(h, rule, name) {
        var t = 10;
    });
    // init selectpicker
    this.on('afterCreateRuleFilters', function(e, rule) {
        var currentRule = rule.$el.find(Selectors.rule_filter);
        var functions = $("<select id='" + rule.id +"_function" + "'></select>");
        options.aggregations.forEach(function(input) {
            var selected = '';
            if (rule.data && rule.data.aggregation == input.id) {
                selected = "selected";
            }
            functions.append("<option " + selected + " value='" + input.id + "'>" + input.label + "</option>");
        })
        functions.insertBefore(currentRule);
        functions.selectpicker(options);
        functions.on("change", function (e) {
            rule.data = rule.data || {};
            rule.data.aggregation = e.currentTarget.value;
            if (!rule.filter)
                return;
            rule.field = rule.data.aggregation + "|" + rule.filter.field;
        });
        currentRule.removeClass('form-control').selectpicker(options);
    });

    this.on('afterCreateRuleOperators', function(e, rule) {
        rule.$el.find(Selectors.rule_operator).removeClass('form-control').selectpicker(options);
    });

    // update selectpicker on change
    this.on('afterUpdateRuleFilter', function(e, rule) {
        rule.$el.find(Selectors.rule_filter).selectpicker('render');
        var currentRule = rule.$el.find(Selectors.rule_filter);
        var agregation = rule.$el.find("#" + rule.id +"_function");
        rule.data = rule.data || {};
        rule.data.aggregation = agregation[0].value;
        rule.field = rule.data.aggregation + "|" + rule.filter.field;
    });

    this.on('afterUpdateRuleOperator', function(e, rule) {
        rule.$el.find(Selectors.rule_operator).selectpicker('render');
    });
}, {
    container: 'body',
    style: 'btn-inverse btn-xs',
    width: 'auto',
    showIcon: false
});

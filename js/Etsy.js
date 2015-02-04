;
(function() {

    function EtsyUser(key) { //beginning of constructor
        this.key = key;
        this.listings = [];
        var self = this;

        var EtsyRouter = Backbone.Router.extend({
            routes: {
                "listing/:id": "detail",
                "": "home"
            },

            home: function() {
                self.draw();
            },

            detail: function(id){
                alert(id)
                // self.detail(id)
            },

            initialize: function() {
                Backbone.history.start();
            }
        })
        var router = new EtsyRouter();

    }; //end of constructor

    //** get listings info [create "drawlistings"]
    //** create a draw function
    //** create a "loadTemplate"
    EtsyUser.prototype = {
        URLs: {
            //         return $.getJSON("https://openapi.etsy.com/v2/listings/active.js?api_key=p5b2j8ib5bv8kej7r78oylwb&callback=?"
            //             ).then(function(data) {return data });}
            listings: function(key){
                return "https://openapi.etsy.com/v2/listings/active.js?includes=Images&api_key="+key+"&callback=?"
            },
            detail: function(key, id){
                return "https://openapi.etsy.com/v2/listings/"+id+".js?includes=Images&api_key="+key+"&callback=?"
            }
        },

        getData: function() {
            var drawdata_url = this.URLs.listings(this.key);

            return $.getJSON(drawdata_url)
                .then(function(data) {
                    return data;
                })
        },

        loadTemplate: function(name) {
            return $.get("./templates/" + name + ".html").then(function(data) {
                return data;
            })
        },

        draw: function() {
            $.when(
                this.getData(),
                this.loadTemplate("Listings")
            ).then(function(data, html) {
                debugger;
                var templatingFn = _.template(html);
                document.querySelector(".container").innerHTML = templatingFn(data);
            })
        }

    }

    window.EtsyUser = EtsyUser;

})();

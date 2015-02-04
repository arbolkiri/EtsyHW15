;
(function() {

        function EtsyUser(key) { //beginning of constructor
                this.key = key;
                this.listings = [];
                var self = this;
                
                var EtsyRouter = Backbone.Router.extend({
                    routes: {
                        ":listing_id": "drawListingInfo"
                    },
                    
                    drawListingInfo: function(listing_id) 
                    { self.drawlistings(listing_id);
                    },//a value assigned to var GithubRouter; what info does this give me?
                        
                    initialize: function() { Backbone.history.start();}
                })
                var router = new EtsyRouter();
                this.draw();    // -->this doesn't exist yet; I need to create my own
           
            };//end of constructor

        //** get listings info [create "drawlistings"]
        //** create a draw function
        //** create a "loadTemplate"
        EtsyUser.prototype = {
            URLs: { Etsy_url: function() {
                    return $.getJSON("https://openapi.etsy.com/v2/listings/active.js?api_key=p5b2j8ib5bv8kej7r78oylwb&callback=?"
                        ).then(function(data) {return data });
                    // listings: "https://openapi.etsy.com/v2/listings/:listing_id.js"
                }
            },
        
                
               listingstoken : function() {
                    return "api_key=" + this.key;
                },

                getData: function(listing_id) {
                    var x = $.Deferred();
                    self = this;

                    if (this.listings.length > 0) {
                        x.resolve(this.listings);
                    } else {
                        var p = $.get(this.URLs.Etsy_url + this.listingstoken()); //-->undefined, why?
                        p.then(function(data) {
                            x.resolve(data);
                            self.listings = data;
                })
            }

            return x;
        },
                
                drawListings: function(listing_id) { 
                    return $.getJSON(this.URLs.Etsy_url + ".js" + "includes=images(url_570xN)&" + this.listingstoken() + "&callback=?"
                        )
                .then(function(data){ return data;
                })
            },

                loadTemplate: function(name) {
                    return $.get("./tempates/" + name + ".html").then(function(data) {
                        return data;})
                },

                draw: function() {
                    $.when(this.getData(), 
                        this.loadTemplate("Listings")
                        ).then(function(listings, html) {
                        var homepage = document.querySelector(".grid");
                        homepage.innerHTML += _.template(html, {listings: listings});
                    })
                
                },
            
        } 
    
            window.EtsyUser = EtsyUser;

        })();


      // console.log(drawlistings)
                    // var drawdata_url = this.URLs.Etsy_url + ".js?" + "includes=Images(url_570xN)&" + this.listings_token() + "&callback=?"

                    // return $.getJSON(drawdata_url)
                    // .then(function(data){
                    //     // console.log(drawdata_url)
                    //     // console.log(data.results);
                        // return data.results;})
   

   

                    //     })

                    // }
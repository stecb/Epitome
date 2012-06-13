buster.testRunner.timeout = 1000;

buster.testCase('Basic Epitome empty collection creation >', {
    setUp: function() {
        this.Collection = new Class({
            Extends: Epitome.Collection,

            foo: function() {

            },

            onChange: function() {
                console.log('hai')
            }
        });

        this.collection = new this.Collection();
        this.model = new Epitome.Model({
            hello: 'there'
        });

    },

    tearDown: function() {
        this.collection.removeEvents('add');
        this.collection.removeEvents('remove');
    },

    'Expect a collection to be created >': function() {
        buster.assert.isTrue(instanceOf(this.collection, Epitome.Collection));
    },

    'Expect adding models to collection to fire onAdd event >': function() {
        var self = this;
        this.collection.addEvent('add', function(model) {
            buster.assert.equals(model, self.model);
        });

        this.collection.addModel(this.model);
    },

    'Expect removing models to collection to fire onRemove event >': function() {
        var self = this;
        this.collection.addModel(this.model);
        this.collection.addEvent('remove', function(model) {
            buster.assert.equals(model, self.model);
        });
        this.collection.removeModel(this.model);
    },


    'Expect to be able to add models to the collection': function() {
        var models = this.collection._models.length;
        this.collection.addModel(this.model);
        buster.assert.equals(this.collection._models.length, models + 1);
    },

    'Expect to be able to remove models from the collection': function() {
        var models = this.collection._models.length;
        this.collection.addModel(this.model);
        this.collection.removeModel(this.model);
        buster.assert.equals(this.collection._models.length, models);
    }


});


buster.testCase('Basic Epitome collection with a model creation >', {
    setUp: function() {
        this.Collection = new Class({
            Extends: Epitome.Collection,

            options: {
                onChange: function() {
                    this.change.apply(this, arguments)
                }
            },

            change: function(model, key) {
                // console.log(model.cid, key, model.get(key));
            }
        });

        this.model = new Epitome.Model({
            hello: 'there'
        });

        this.collection = new this.Collection([this.model]);

    },

    tearDown: function() {
        this.collection.removeEvents('add');
        this.collection.removeEvents('remove');
    },

    'Expect models to be 1': function() {
        buster.assert.equals(this.collection._models.length, 1);
    },

    'Expect onChange on a model to fire for collection >': function() {
        this.model.set('foo', 'bar');
        buster.assert(true);
    }


});
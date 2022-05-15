module.exports = () => {
    var mocker = require('mocker-data-generator').default;
    var format = {
        "id": {
            chance: 'guid'
        },
        "name": {
            faker: "name.firstName"
        },
        "configuration": {
            "hasSentience": {
                function: function() {
                    return Math.random() < 0.5;
                }
            },
            "hasWheels": {
                function: function() {
                    return Math.random() < 0.5;
                }
            },
            "hasTracks": {
                function: function() {
                    return Math.random() < 0.5;
                }
            },
            "numberOfRotors": {
                faker: 'datatype.number({"min": 0, "max": 17})'
            },
            "Colour": {
                values: ['blue', 'red', 'black', 'white']
            }
        },
        statuses: [{
            values: ['on fire', 'rusty', 'loose screw', 'paint scratched'],
            length: 4,
            fixedLength: false
        }]
    };

    const data = mocker().schema('data', format, 100).buildSync();

    console.log(data);

    return {robots: data.data};
  }
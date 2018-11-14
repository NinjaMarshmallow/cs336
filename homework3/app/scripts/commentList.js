import React from 'react';
import Remarkable from 'remarkable';
import people from './people';
module.exports = React.createClass({
    render: function() {
        var peopleNodes = this.props.data.map(function(people) {
            return (
                <people author={people.firstName + " " + people.lastName} key={people.id}>
                    {"ID: " + people.loginID + " --- Started on: " + people.startDate}
                </people>
            );
        });
        return (
            <div className="peopleList">
                {peopleNodes}
            </div>
        )
    }
});
import React from 'react';
import Remarkable from 'remarkable';
import People from './people';
module.exports = React.createClass({
    render: function() {
        var peopleNodes = this.props.data.map(function(people) {
            return (
                // HTML for all the people object
                <People name={people.firstName + " " + people.lastName} key={people._id}>
                    {"ID: " + people.loginID + " --- Started on: " + people.startDate}
                </People>
            );
        });
        return (
            <div className="peopleList">
                {peopleNodes}
            </div>
        )
    }
});
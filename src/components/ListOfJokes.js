import React from 'react';

const Jokes = props => {
    const { jokes } = props;
    if (!jokes.length) {
        return null;
    }
    return (
        <div className="row">
            <div className="col-8">
                <ul className="list-group">
                    {jokes.map((data, index) => {
                        return (
                            <li key={index} className="list-group-item">
                                {data.joke}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Jokes;





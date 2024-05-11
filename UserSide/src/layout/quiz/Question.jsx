// Question.js

import React from 'react';

function Question({ question, selectedOption, onSelect }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">{question.statement}</h2>
      <div>
        {question.options.map((option, index) => (
          <div key={index} className="mb-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="option"
                value={index}
                checked={selectedOption === index}
                onChange={() => onSelect(index)}
                className="mr-2"
              />
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Question;

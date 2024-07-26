// src/components/DynamicSearchForm.js
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { useAuth } from '../context/AuthContext';
import useDebounce from '../customHooks/useDebounce';

const DynamicSearchForm = () => {
  const { isAuthenticated } = useAuth();
  const [searchValues, setSearchValues] = useState(['']);
  const [submittedValues, setSubmittedValues] = useState([]);
  const debouncedSearchValues = useDebounce(searchValues, 300);

  useEffect(() => {
    console.log('Debounced Search Values:', debouncedSearchValues);
  }, [debouncedSearchValues]);

  return (
    <div style={{textAlign: 'center'}}>
      <h2>Dynamic Search Form</h2>
      <h4 style={{marginBottom: 0}}>Debounced values</h4>
      <div style={{marginBottom: 20}}>{debouncedSearchValues.map((debouncedSearchValue, index) => debouncedSearchValue && <li kay={index}>{debouncedSearchValue}</li>)}</div>
      <Formik
        initialValues={{ searches: [''] }}
        onSubmit={() => {
          setSubmittedValues(debouncedSearchValues);
          console.log('Submitted Search Values:', debouncedSearchValues);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <FieldArray name="searches">
              {({ push, remove }) => (
                <div>
                  {values.searches.map((_, index) => (
                    <div key={index}>
                      <Field
                        name={`searches[${index}]`}
                        placeholder="Search..."
                        value={searchValues[index] || ''}
                        onChange={e => {
                          const newValues = [...searchValues];
                          newValues[index] = e.target.value;
                          setSearchValues(newValues);
                          setFieldValue(`searches[${index}]`, e.target.value);
                        }}
                      />
                      {isAuthenticated && (
                        <button type="button" onClick={() => {
                          const newValues = searchValues.filter((_, i) => i !== index);
                          setSearchValues(newValues);
                          remove(index);
                        }}>
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  {isAuthenticated && (
                    <button type="button" onClick={() => {
                      push('');
                      setSearchValues([...searchValues, '']);
                    }}>
                      Add Field
                    </button>
                  )}
                </div>
              )}
            </FieldArray>
            <button disabled={!searchValues.some(value => value !== '')} type="submit">Submit</button>
          </Form>
        )}
      </Formik>
      {submittedValues.length > 0 && (
        <div>
          <h3>Submitted Searches</h3>
          <ul>
            {submittedValues.map((value, index) => (
              value && <li key={index}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DynamicSearchForm;

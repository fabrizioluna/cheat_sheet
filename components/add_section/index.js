import { useState } from "react";
import { httpRequest } from "../../helpers/httpRequest";
import { useForm } from "../../hooks/useForm";


export const AddSection = ({ name_category }) => {

    const [form, inputChange, showFormChange, showForm] = useForm({
      section_title: ''
    });

    const addSectionHandler = async(e) => {
        e.preventDefault();

        await Promise.all([
          httpRequest().post(`${process.env.URL}section`, { 
              headers: {
                  'Content-type': 'application/json'
              },
              body: JSON.stringify({ 
                name: name_category, 
                section_title: form.section_title
              }), 
          }),
      ]);
    }

    return (
        <section>
            <button onClick={showFormChange}>{showForm ? 'Ocultar formulario' : 'Agregar sección'}</button>
            {showForm && <form onSubmit={addSectionHandler}>
              <p>Rellena el campo nombre para crear la nueva sección.</p>
              <input 
                name='section_title'
                onChange={inputChange}
                placeholder='Nombre de la categoria' 
              />
              {/* <select onChange={inputChange}>
                <option>Notas</option>
                <option>Código</option>
              </select> */}
              <button type='submit'>Agregar</button>
            </form>}
          </section>
    )
}
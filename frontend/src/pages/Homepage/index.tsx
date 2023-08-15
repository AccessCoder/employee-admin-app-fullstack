import {Link, useNavigate} from 'react-router-dom'
import SearchEmployee from '../../components/SearchEmployee'
import TableView from '../../components/Tableview'
import React, {FormEvent, useState} from 'react'
import { Employee } from '../../App.tsx'
import './Homepage.css'
import axios from "axios";


type HomepageProps = {
  employees: Employee[]
  children: React.ReactElement
  deleteEmployee: (id: string) => void
  toggleIsEditMode:() => void
}

export function Homepage({
  employees,
  children,
  deleteEmployee,
                           toggleIsEditMode
}: HomepageProps) {
  const [searchInput, setSearchInput] = useState<string>('')

  const nav = useNavigate();
  function handleOnChange(newInput: string) {
    setSearchInput(newInput)
  }

  function resetSearchInput() {
    setSearchInput('')
  }
  const filteredEmployees: Employee[] = employees.filter(
    (employee) =>
      employee.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
      searchInput === ''
  )

  function logout(event:FormEvent<HTMLFormElement>){
    event.preventDefault()
    axios.post("/api/user/logout")
        .then((response) => console.log(response.data))
        .then(() => nav("/"))
        .catch((error) => console.log(error))
  }
  return (
    <div>
      <form onSubmit={logout}>
      <button>Logout</button>
      </form>
      {children}
      <div className={'action-btn-wrapper'}>
        <Link to={'/add'}>
          <button className={'add-btn'}>Add new employee</button>
        </Link>
        <SearchEmployee
          onClick={resetSearchInput}
          onChange={handleOnChange}
          searchInput={searchInput}
        />
      </div>
      <TableView
        employees={filteredEmployees}
        deleteEmployee={deleteEmployee}
        toggleIsEditMode={toggleIsEditMode}
      />
    </div>
  )
}

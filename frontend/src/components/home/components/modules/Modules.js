import React from 'react';
import './Modules.css'

const ModulesCategories = [
    'Foreign Exchange',
    'Money Market',
    'Finance',
    'Accounts',
    'Employee Mangement',
    'Regulations',
    'Admin & Controls'
]

function Modules({onServiceClicked, services}) {
  return (
    <div className='Main-Container'>
        <div className='Sub-ContainerOne'>
            {ModulesCategories.map((category, index) =>(
                <div id='Side-Categories' key={index}><p>{category}</p></div>
            ))}
        </div>

        <div className='Sub-ContainerTwo'>
            <div id='One'>
                <div>
                    <p id='One-One'>Explore All Modules</p>
                </div>
                <div>
                    <p id='One-Two'>View all the modules from the Santasoft Platform. Each module is developed and marketed with operational support using the technology with better speed, scale, security, and user experience.</p>
                </div>
            </div>
            <div id='Two'>
                {services.map((service, index) => {
                    return(
                        <div className='Module-Categories' key={index}>
                            <div id='SubModuleOne'>
                                <div>
                                    <p id='Two-One'>{service.category}</p>
                                </div>
                                <div>
                                    <p id='Two-Two'>{service.description}</p>
                                </div>
                            </div>
                            <div id='SubModuleTwo'>
                                <table id='ModuleTable'>
                                    <thead>
                                        <tr style={{borderBottom:'1px solid rgb(151, 151, 151)', textAlign:'left', fontSize:'small', backgroundColor:'rgb(151, 151, 151)'}}>
                                            <th style={{width:'250px', padding:'5px 0px 5px 15px'}}>Name</th>
                                            <th style={{width:'350px', padding:'5px 0px 5px 15px'}}>Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {service.modules.map((module, index) => {
                                            return(
                                                <tr key={index} style={{borderBottom:'1px solid rgb(151, 151, 151)', fontSize:'small', padding:'50px'}}>
                                                    <td onClick={() => onServiceClicked(service.category,module.name,module.value)} style={{padding:'10px 0px 10px 15px', cursor:'pointer'}}>{module.name}</td>
                                                    <td style={{padding:'10px 0px 10px 15px'}}>{module.description}</td>
                                                </tr>
                                            )}
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>    
                    )}
                )}
            </div>
        </div>
    </div>
  )
}

export default Modules
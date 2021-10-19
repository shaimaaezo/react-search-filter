import React, { Component } from 'react';
import logo from './Images/logo.jpg'
import Nova from './Images/Nova SBE.png'
import './task.css'
import dataa from '../progs.json'


class Task extends Component {
    state = {
        AllData: [],
        field: [],
        cityes: [],
        programs: '',
        selectCity: '',
        selectField: '',
        searchCity: "",
        searchInput: "",
        language: '',
        sort: "",
        filter: [],


    }
    componentDidMount() {

        const dataArray = []
        for (let key in dataa) {
            let obje = {}
            for (let obj in dataa[key]) {
                let sentence = dataa[key][obj]
                let noSpacesString = sentence.trim()
                let lowercasetext = noSpacesString.toLowerCase()
                obje[obj] = lowercasetext
                //console.log(obje.obj) 
            }
            dataArray.push(obje)
        }
        //console.log(dataArray)
        this.setState({ AllData: dataArray })
        this.setState({ filter: dataArray })

        //city    
        const arr = []
        for (let key in dataArray) {
            let sentence = dataArray[key].city
            let found = arr.find(elem => elem === sentence)
            if (found === undefined) {
                arr.push(sentence)
            }
        }
        this.setState({ cityes: arr })
        //arr.remove()


        //fields
        const array = []
        for (let key in dataArray) {
            let sentence = dataArray[key].type
            let found = array.find(elem => elem === sentence)
            if (found === undefined) {
                array.push(sentence)
            }
        }
        this.setState({ field: array })
    }

    onValuechange = (event) => {
        this.setState({ programs: event.target.value })
    }

    handleSelectCity = (event) => {
        this.setState({ selectCity: event.target.value })
    }
    handleSearchCity = (event) => {
        this.setState({ searchCity: event.target.value })
    }

    handelSearchInput = (event) => {
        this.setState({ searchInput: event.target.value })
    }

    searchButton = (data) => {
        let array = data.filter((row) => row.city.indexOf(this.state.searchCity) > -1 && row.type.indexOf(this.state.searchInput) > -1)
        this.setState({ AllData: array })
    }

    handleSelectField = (event) => {
        this.setState({ selectField: event.target.value })
    }

    handeLanguage = (event) => {
        this.setState({ language: event.target.value })
    }

    handeSort = (event) => {
        this.setState({ sort: event.target.value })
    }

    onsubmit = (data) => {
        //e.preventDefault()

        var filtersData = data.filter((row) => row.city.indexOf(this.state.selectCity) > -1 && row.type.indexOf(this.state.selectField) > -1
            && row.level.indexOf(this.state.programs) > -1 && row.Language.indexOf(this.state.language) > -1
        )
        this.state.sort === "cas" ? filtersData.sort((a, b) => parseFloat(a.fee) - parseFloat(b.fee)) : filtersData.sort((a, b) => parseFloat(b.fee) - parseFloat(a.fee))
        this.setState({ AllData: filtersData })
        //this.setState({selectCity:"",selectField:"",programs:"",language:""})
    }



    render() {
        //console.log(this.state.AllData[0] && Object.keys(this.state.AllData[0]))
        return (
            <div className="body">
                <header className="header">
                    <nav className="navbar navbar-expand-sm py-3">
                        <div className="container"><img src={logo} className="nav-logo mr-1" alt="Renty logo" />
                            <button type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" className="navbar-toggler navbar-toggler-right"><i className="fa fa-bars"></i></button>

                            <div id="navbarSupportedContent" className="collapse navbar-collapse">
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item active"><a href="/" className="nav-link ">Home </a></li>
                                    <li className="nav-item"><a href="/" className="nav-link ">Programs</a></li>
                                    <li className="nav-item"><a href="/" className="nav-link ">School</a></li>
                                    <li className="nav-item"><a href="/" className="nav-link ">About</a></li>
                                    <li className="nav-item"><a href="/" className="nav-link ">Login</a></li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>


                <div className="container" style={{ marginTop: "120px" }}>

                    <div className="d-sm-flex justify-content-center ">

                        <div className="">
                            <input type="search" className="form-control  pr-5 " placeholder="what do you want to learn " aria-label="Large" aria-describedby="inputGroup-sizing-sm"
                                value={this.state.searchInput} onChange={this.handelSearchInput}
                            />
                        </div>

                        <div className="">
                            <select className="form-control selectpicker  mr-5 " name="search" id="search" aria-label="Large" aria-describedby="inputGroup-sizing-sm"
                                value={this.state.searchCity} onChange={this.handleSearchCity}>
                                {<option value="" disabled selected>Select your option</option>}
                                {this.state.cityes.map(city => (
                                    <option value={city} key={city.id} >{city}</option>
                                ))}
                            </select>
                        </div>
                        <div className="">
                            <button className="btn btn-primary " style={{ width: "100%" }} onClick={() => this.searchButton(this.state.filter)}>Search</button>
                        </div>
                    </div>




                    <div className="row mt-5 mb-5">

                        <div className="col-lg-4 ml-auto card shadow" style={{ width: "100%", height: "100%" }}>
                            {//dataa.map(info=>(
                                <>
                                    <div className="card-body">
                                        <form>
                                            <h4 className="card-title">City</h4>
                                            <div className="wrap-icon">
                                                <div className="form-group">
                                                    {<select className="form-control selectpicker" name="city" id="city" placeholder="select city"
                                                        value={this.state.selectCity} onChange={this.handleSelectCity}>
                                                        {<option value="" disabled selected>Select your option</option>}
                                                        {this.state.cityes.map(info => (
                                                            <>
                                                                <option value={info} key={info.id} >{info}</option>
                                                            </>
                                                        ))}
                                                    </select>}
                                                </div>
                                            </div>




                                            <h5 className="text-black-md mb-3 mt-5">Programs</h5>
                                            <div className="">

                                                <div className="form-check colm">
                                                    <input className="form-check-input " type="radio" name="flexRadioDefault" id="flexRadioDefault1" defaultValue="bachelor"
                                                        checked={this.state.programs === "bachelor"} onChange={this.onValuechange}
                                                    />
                                                    <label className="form-check-label " htmlFor="flexRadioDefault1">Bachelor</label>
                                                </div>
                                                <div className="form-check colm ">
                                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultValue="msc"
                                                        checked={this.state.programs === "msc"} onChange={this.onValuechange} />
                                                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                        Master
                                                    </label>
                                                </div>
                                                <div className="form-check colm ">
                                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" defaultValue="mba"
                                                        checked={this.state.programs === "mba"} onChange={this.onValuechange} />
                                                    <label className="form-check-label" htmlFor="flexRadioDefault3">
                                                        MBA
                                                    </label>
                                                </div>
                                                <div className="form-check  ">
                                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4" defaultValue="mim"
                                                        checked={this.state.programs === "mim"} onChange={this.onValuechange} />
                                                    <label className="form-check-label" htmlFor="flexRadioDefault4">
                                                        MIM
                                                    </label>
                                                </div>
                                            </div>

                                            <h4 className="card-title">Field</h4>
                                            <div className="wrap-icon">
                                                <div className="form-group">
                                                    <select className="form-control" name="field" id="field" value={this.state.selectField} onChange={this.handleSelectField}>
                                                        {<option value="" disabled selected>Select your option</option>}
                                                        {this.state.field.map(info => (
                                                            <>
                                                                <option value={info}>{info}</option>
                                                            </>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <h5 className="text-black mb-3 mt-5">Language</h5>
                                            <div>
                                                <div className="form-check colm">
                                                    <input className="form-check-input" type="radio" name="flexRadioDefaulte" id="flexRadioDefault5" defaultValue="english"
                                                        checked={this.state.language === "english"} onChange={this.handeLanguage} />
                                                    <label className="form-check-label" htmlFor="flexRadioDefault5">
                                                        All
                                    </label>
                                                </div>
                                                <div className="form-check colm">
                                                    <input className="form-check-input" type="radio" name="flexRadioDefaulte" id="flexRadioDefault6" defaultValue="english"
                                                        checked={this.state.language === "english"} onChange={this.handeLanguage} />
                                                    <label className="form-check-label" htmlFor="flexRadioDefault6">
                                                        Engilsh
                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="flexRadioDefaulte" id="flexRadioDefault7" defaultValue="french"
                                                        checked={this.state.language === "french"} onChange={this.handeLanguage} />
                                                    <label className="form-check-label" htmlFor="flexRadioDefault7">
                                                        French
                                    </label>
                                                </div>
                                            </div>


                                            <h5 className="text-black mb-3 mt-5">Sort</h5>
                                            <div>
                                                <div className="form-check colmn">
                                                    <input className="form-check-input" type="radio" name="flexRadioDefaultx" id="flexRadioDefault8" defaultValue="cas"
                                                        checked={this.state.sort === "cas"} onChange={this.handeSort}
                                                    />
                                                    <label className="form-check-label" htmlFor="flexRadioDefault8">
                                                        Price: low to high
                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="flexRadioDefaultx" id="flexRadioDefault9" defaultValue="des"
                                                        checked={this.state.sort === "des"} onChange={this.handeSort}
                                                    />
                                                    <label className="form-check-label" htmlFor="flexRadioDefault9">
                                                        Price: high to low
                                    </label>
                                                </div>
                                            </div>
                                        </form>
                                        <button className="btn btn-primary mt-3" onClick={() => this.onsubmit(this.state.filter)}>Filter</button>
                                    </div>
                                </>
                                //))
                            }
                        </div>




                        <div className="col-md-8 marg " >
                            <div className="shadow">
                                {this.state.AllData.map(info => (
                                    <>
                                        <div className="media border " >
                                            <div className="row" style={{minWidth:"100%"}}>
                                                <div className=" col-2">
                                                    <img src={Nova} className="align-self-center rounded mr-3 ml-2 d-none d-sm-block shadow" style={{ width: "100%" ,marginTop:"25%",height:"50%"}} alt="" />
                                                </div>
                                                <div className="media-body col-10">
                                                    <div style={{fontWeight:"bold",}} >{info.Name}</div>
                                                    <div>{info.type}</div>
                                                    <div className="row mb-2" >                              
                                                        <small className="col-3 pr-0" style={{ color: 'gray' ,marginTop:"6px"}}>Tuition Fee</small>
                                                        <small className="col-3 p-0" style={{ color: 'blue' ,marginTop:"6px"}}>{info.fee}$ Per Year</small>
                                                        <small className="col-2 pr-0" style={{ color: 'blue' ,marginTop:"6px"}}>{info.city}</small>
                                                        <button className="btn btn-primary ">More Info</button>
                                                    </div>
                                                </div>    
                                            </div>
                                        </div>
                                    </>
                                ))
                                }
                            </div>
                        </div>

                    </div>
                </div>


            </div>
        );
    }
}

export default Task;

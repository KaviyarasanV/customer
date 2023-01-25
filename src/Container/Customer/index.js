import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import API from '../../Services/BaseService';
const Customer = () => {
    const [editShow, setEditShow] = useState(false);
    const [displayOrderValue, setDisplayOrderValue] = useState([]);
    const [newSchema, setNewSchema] = useState([]);
    const [segmentName, setSegmentName] = useState("");

    const custList = [
        { "label": "First Name", "value": "first_name" },
        { "label": "Last Name", "value": "last_name" },
        { "label": "Gender", "value": "gender" },
        { "label": "Age", "value": "age" },
        { "label": "Account Name", "value": "account_name" },
        { "label": "City", "value": "city" },
        { "label": "State", "value": "state" }
    ]
    const option = [
        { "value": "first_name", "label": { "first_name": "First Name" } },
        { "value": "last_name", "label": { "last_name": "Last Name" } },
        { "value": "gender", "label": { "gender": "Gender" } },
        { "value": "age", "label": { "age": "Age" } },
        { "value": "account_name", "label": { "account_name": "Account Name" } },
        { "value": "city", "label": { "city": "City" } },
        { "value": "state", "label": { "state": "State" } },

    ]
    const handleEditClose = () => {
        setEditShow(false);
        setNewSchema([]);
    }
    const handleEditShow = () => {
        setEditShow(true);
    }

    const getDropDownValue = (e, id) => {
        const filterValue = displayOrderValue.filter((item) => item.id == id)
        if (filterValue.length > 0) {
            const findIndex = displayOrderValue.findIndex(item => item.id == id)
            const schm = displayOrderValue;
            schm[findIndex].value = e.target.value;
            const sechemaVal = option.filter(data => data.value === e.target.value)
            const frtSechema = sechemaVal[0].label
            schm[findIndex].sechemas = frtSechema;
            setDisplayOrderValue(schm);
        }
        else {
            const sechemaVal = option.filter(data => data.value === e.target.value)
            const frtSechema = sechemaVal[0].label
            setDisplayOrderValue([...displayOrderValue, { id: id, value: e.target.value, sechemas: frtSechema }]);
        }
    }

    const getNewSchema = () => {
        const filterValue = displayOrderValue.filter(item => item.id == undefined)
        if (filterValue.length) {
            const addschema = document.getElementById("addschema");
            addschema.value = "";
            addschema.placeholder = "Add schema to segment";
            setDisplayOrderValue(displayOrderValue.filter(item => item.id != undefined));
        }
        setNewSchema([...newSchema, { "id": newSchema.length + 1 }])
    }
    const handleSegment = () => {
        let request = {
            segment_name: segmentName,
            schema: displayOrderValue.map(data => data.sechemas)
        }
        API.post("ec72260c-121f-46ae-9abe-9b64f883c92f",request);
    }
    return (
        <div>
            <section id="innerpage" class="innerpage inventoryPage">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6  col-md-6 col-sm-6 innerRight">
                            <div class="row">
                                <div class="item inventoryBlock col-lg-4 col-md-6 col-sm-6" >
                                    <div class="card" >
                                        <div class="card-body">
                                            <div class="card-amount-sec ">
                                                <a class="btn btn-primary" onClick={() => handleEditShow()}>Save segment</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Modal size="wrapper modal-dialog-centered modal-md" show={editShow} onHide={handleEditClose}>
                <Modal.Header>
                    <Modal.Title>
                        <h5 className="modal-title" id="exampleModalLabel">Segment</h5>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="row">
                            <div className="col-lg-8 mb-3">
                                <label htmlFor="id" className="col-form-label">Enter the Name of the Segment</label>
                                <input type="text" className="form-control" id="id" placeholder='Name of the Segment' onChange={(e) => { setSegmentName(e.target.value) }} />
                                <p className="cnt-sgmt">To save your segment, you need to add the sechemas to built the query</p>
                            </div>
                            <div className="col-lg-8 mb-3">
                                <div className='sechema-brd'>
                                    {newSchema.length > 0 ? newSchema.map((data, index) =>
                                        <div className="tbox ">
                                            <select className="form-control select" id={`dropDownEnable${index}`}
                                                onChange={(e) => { getDropDownValue(e, data.id) }}>
                                                <option value={""} style={{ "display": "none" }}>-- Select --</option>
                                                {custList.map((item) =>
                                                    displayOrderValue.find((orderValue) => {
                                                        return orderValue.value === item.value && orderValue.id !== data.id
                                                    }) ? <></> :

                                                        <option key={item.value} value={item.value}>{item.label}</option>
                                                )}

                                            </select>
                                            <button className="btn btn-outline-secondary custom-add-btn ms-2" type="button" id="button-addon2" > - </button>
                                        </div>
                                    ) : "No schema found"
                                    }
                                </div>
                            </div>

                            <div className="col-lg-8 mb-3">
                                <div className="stc-sch">
                                    <div className="tbox">
                                        <select className="form-control select" id='addschema'
                                            onChange={(e) => { getDropDownValue(e) }}>
                                            <option value={""} style={{ "display": "none" }}>Add schema to segment</option>
                                            {custList.map((item) =>
                                                displayOrderValue.find((orderValue) => {
                                                    return orderValue.value === item.value && orderValue.id
                                                }) ? <></> :
                                                    <option key={item.value} value={item.value}>{item.label}</option>
                                            )}
                                        </select>
                                        <button className="btn btn-outline-secondary custom-add-btn ms-2" type="button" id="button-addon2" > - </button>
                                    </div>
                                </div>
                                <div>
                                    <a className='addschm' onClick={getNewSchema}>+ Add new schema</a>
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn form-submit-btn-pop" onClick={handleSegment}>Save the segment</button>
                    <button type="button" className="btn form-submit-secbtn-pop" onClick={handleEditClose}>Close</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default Customer;
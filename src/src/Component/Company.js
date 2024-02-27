import { Button, Checkbox, Dialog, DialogContent, DialogTitle, FormControlLabel, IconButton, Paper, Radio, RadioGroup, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { CreateCompany, GetAllCompanys, GetCompanybycode, RemoveCompany, UpdateCompany } from "../Redux/ActionCreater";
import { connect, useDispatch, useSelector } from "react-redux";
import { OpenPopup } from "../Redux/Action";
import CloseIcon from "@mui/icons-material/Close"

const Company = (props) => {
    const columns = [
        { id: 'id', name: 'ID' },
        { id: 'firstname', name: 'First Name' },
        { id: 'lastname', name: 'Last Name' },
        { id: 'middlename', name: 'Middle Name' },
        { id: 'birthday', name: 'Birthday' },
        { id: 'gender', name: 'Gender' },
        { id: 'address', name: 'Address' },
        { id: 'mobilenumber', name: 'Mobile number' },
        { id: 'jobtitle', name: 'Job Title' },
        { id: 'action', name: 'Action' }
    ]

    const dispatch = useDispatch();

    const [id, idchange]=useState(0);
    const [firstname, firstnamechange]=useState('');
    const [lastname, lastnamechange]=useState('');
    const [middlename, middlenamechange]=useState('');
    const [birthday, birthdaychange]=useState('');
    const [gender, genderchange]=useState('');
    const [address, addresschange]=useState('');
    const [mobilenumber, mobilenumberchange]=useState('');
    const [jobtitle, jobtitlechange]=useState('');

    const [open, openchange]=useState(false);

    const [rowperpage, rowperpagechange] = useState(5);
    const [page, pagechange] = useState(0);

    const [isedit, iseditchange] = useState(false);
    const [title, titlechange] = useState('Add employee');

    const editobj = useSelector((state) => state.company.companyobj);

    useEffect(() => {
        if (Object.keys(editobj).length > 0) {
            idchange(editobj.id);
            firstnamechange(editobj.firstname);
            lastnamechange(editobj.lastname);
            middlenamechange(editobj.middlename);
            birthdaychange(editobj.birthday);
            genderchange(editobj.gender);
            addresschange(editobj.address);
            mobilenumberchange(editobj.mobilenumber);
            jobtitlechange(editobj.jobtitle);
        } else {
            clearstate();
        }
    
    }, [editobj])

    const handlepagechange = (event, newpage) => {
        pagechange(newpage);
    }

    const handlerowperpagechange = (event) => {
        rowperpagechange(+event.target.value);
        pagechange(0);
    }

    const functionadd=()=>{
        iseditchange(false);
        titlechange('Add employee');
        openpopup();
    }
    const closepopup=()=>{
        openchange(false);
    }
    const openpopup=()=>{
        openchange(true);
        clearstate();
        dispatch(openpopup())
    }

    const handlesubmit = (e) => {
        e.preventDefault();
        const _obj = { id, firstname, lastname, middlename, birthday, gender, address, mobilenumber, jobtitle };
        if (isedit) {
            dispatch(UpdateCompany(_obj));
        } else {
            dispatch(CreateCompany(_obj));
        }
        closepopup();
    }

    const handleEdit = (code) => {
        iseditchange(true);
        titlechange('Update employee');
        openchange(true);
        dispatch(GetCompanybycode(code))
    }

    const handleRemove = (code) => {
        if (window.confirm('Do you want to remove?')) {
            dispatch(RemoveCompany(code));
        }
    }

    const clearstate = () => {
        idchange(0);
        firstnamechange('');
        lastnamechange('');
        middlenamechange('');
        birthdaychange('');
        genderchange('');
        addresschange('');
        mobilenumberchange('');
        jobtitlechange('');
    }

    useEffect(()=>{
        props.loadcompany();
    },[])

    return (
        props.companystate.isloading ? <div><h2>Loading.....</h2></div> :
        props.companystate.errormessage ? <div><h2>{props.companystate.errormessage}</h2></div> :
            <div>
                <Paper sx={{ margin: '1%' }}>
                    <div style={{ margin: '1%' }}>
                        <Button onClick={functionadd} variant="contained">Add New (+)</Button>
                    </div>
                    <div style={{ margin: '1%' }}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow style={{ backgroundColor: 'midnightblue' }}>
                                    {columns.map((column) =>
                                        <TableCell key={column.id} style={{ color: 'white' }}>{column.name}</TableCell>
                                    )}
                                    </TableRow>

                                </TableHead>
                                <TableBody>
                                    {props.companystate.companylist &&
                                        props.companystate.companylist
                                            .slice(page * rowperpage, page * rowperpage + rowperpage)
                                            .map((row,i)=>{
                                                return (
                                                    <TableRow key={i}>
                                                        <TableCell>{row.id}</TableCell>
                                                        <TableCell>{row.firstname}</TableCell>
                                                        <TableCell>{row.lastname}</TableCell>
                                                        <TableCell>{row.middlename}</TableCell>
                                                        <TableCell>{row.birthday}</TableCell>
                                                        <TableCell>{row.gender}</TableCell>
                                                        <TableCell>{row.address}</TableCell>
                                                        <TableCell>{row.mobilenumber}</TableCell>
                                                        <TableCell>{row.jobtitle}</TableCell>
                                                        <TableCell>
                                                            <Button onClick={e => { handleEdit(row.id) }} variant="contained" color="primary">Edit</Button>
                                                            <Button onClick={e => { handleRemove(row.id) }} variant="contained" color="error">Delete</Button>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[2, 5, 10, 20]}
                            rowsPerPage={rowperpage}
                            page={page}
                            count={props.companystate.companylist.length}
                            component={'div'}
                            onPageChange={handlepagechange}
                            onRowsPerPageChange={handlerowperpagechange}
                        >

                        </TablePagination>
                    </div>
                </Paper>

                <Dialog open={open} onClose={closepopup} fullWidth maxWidth="sm">
                    <DialogTitle>
                        <span>{title}</span>
                        <IconButton style={{ float: 'right' }} onClick={closepopup}><CloseIcon color="primary"></CloseIcon></IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <form onSubmit={handlesubmit}>
                            <Stack spacing={2} margin={2}>
                                <TextField required error={firstname.length === 0} value={firstname} onChange={e => {firstnamechange(e.target.value)}} variant="outlined" label="First Name"></TextField>
                                <TextField required error={lastname.length === 0} value={lastname} onChange={e => {lastnamechange(e.target.value)}} variant="outlined" label="Last Name"></TextField>
                                <TextField required error={middlename.length === 0} value={middlename} onChange={e => {middlenamechange(e.target.value)}} variant="outlined" label="Middle Name"></TextField>
                                <TextField required error={birthday.length === 0} value={birthday} onChange={e => {birthdaychange(e.target.value)}} variant="outlined" label="Birthday"></TextField>
                                <TextField required error={gender.length === 0} value={gender} onChange={e => {genderchange(e.target.value)}} variant="outlined" label="Gender"></TextField>
                                <TextField required error={address.length === 0} multiline maxRows={2} minRows={1} value={address} onChange={e => {addresschange(e.target.value)}} variant="outlined" label="Address"></TextField>
                                <TextField required error={mobilenumber.length === 0} value={mobilenumber} onChange={e => {mobilenumberchange(e.target.value)}} variant="outlined" label="Mobile number"></TextField>
                                <TextField required error={jobtitle.length === 0} value={jobtitle} onChange={e => {jobtitlechange(e.target.value)}} variant="outlined" label="Job Title"></TextField>
                                <Button disabled={firstname.length === 0 || lastname.length === 0 || middlename.length === 0 || birthday.length === 0 || gender.length === 0 || address.length === 0 || mobilenumber.length === 0 || jobtitle.length === 0} variant="contained" type="submit">Save</Button>
                            </Stack>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
    );
}

const mapStatetoProps = (state) => {
    return {
        companystate: state.company
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        loadcompany: () => dispatch(GetAllCompanys())
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Company);
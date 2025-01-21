import uploadImgae from '../../../../santasoft/res/upload.png'

function UploadTransactionsButton({ name, setUpload, x }) {
    return (
        <div className='fixed-income-dashboard-upload-transaction-button-container' style={{marginLeft: x}} onClick={() => setUpload(true)}>
            {/* <div className='fixed-income-dashboard-selector' style={{ backgroundColor: '#2196F3', color: 'white' }} onClick={() => setIsSecurity('security')}> */}
            <div style={{ float: 'right', marginRight: '5px', marginBottom: '0.1%' }}><img className='transaction-grid-picture' src={uploadImgae} title="Upload" alt="Upload" /></div>Upload {name}
            {/* </div> */}
        </div>
    )
}

export default UploadTransactionsButton
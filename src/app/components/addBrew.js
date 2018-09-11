import React, { Component } from 'react';
import { database, storage } from './firebase';
import { connect } from 'react-redux';
import styled from 'styled-components';
import FileUploader from 'react-firebase-file-uploader';
import SmallLoading from './SmallLoading';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCloudUpload from '@fortawesome/fontawesome-free-solid/faCloudUploadAlt';
import faCheckCircle from '@fortawesome/fontawesome-free-solid/faCheckCircle';
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus';
import faMinus from '@fortawesome/fontawesome-free-solid/faMinus';
import SelectLocationPanel from './panels/SelectLocationPanel';

const AddBrewWrapper = styled.div`
    box-shadow: 0 1px 17px 0 rgba(0, 0, 0, 0.07);
    text-align: right;
    padding: 30px 20px;
    button {
        background-color: #006ab6;
        border-radius: 3px;
        padding: 10px 35px;
        width: auto;
        font-size: 13px;
        text-align: center;
        cursor: pointer;
        color: white;
        transition: opacity 0.5s ease;
        border: none;
        margin-top: 10px;
        &:hover {
            opacity: 0.7;
        }
    }
`;

const AddBrewForm = styled.form`
    display: grid;
    grid: auto auto auto / auto auto auto;
    grid-gap: 10px 20px;
    align-items: end;
    justify-items: end;

    label {
        box-sizing: border-box;
        width: 100%;
        text-align: left;
        align-items: end;
        justify-items: end;
    }
    input {
        height: 25px;
        width: 100%;
        padding-left: 5px;
        margin-left: -5px;
    }
`;

const DisplayBeers = styled.div``;

const UploadImage = styled.label`
    border: 1px dashed #ccc;
    background-color: white;
    color: darkgray;
    cursor: pointer;
    font-size: 13px;
    display: flex;
    transition: all 0.5s ease;
    width: 100%;
    min-height: 71px;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
    svg {
        height: 50px !important;
        width: 50px !important;
        display: block;
        margin: 0 auto;
    }
`;

const UploadImageWrapper = styled.div`
    width: 31%;
    position: relative;
    text-align: left;
    margin-top: 10px;
    img {
        width: 100px;
        height: 100px;
        position: relative;
        border: 1px solid #ccc;
    }
`;

const Close = styled.div`
    position: absolute;
    top: -10px;
    left: 85px;
    background: white;
    width: 30px;
    box-shadow: 0px 0px 2px black;
    text-align: center;
    border-radius: 25px;
    padding-top: 4px;
    cursor: pointer;
    z-index: 1;
`;

const ImageWrapper = styled.div`
    position: relative;
    margin-top: 30px;
`;

const BeerItemWrapper = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    margin-left: -10px;
    margin-right: -10px;
`;

const AddSize = styled.div`
    cursor: pointer;
`;

const BeerItem = styled.div`
    box-shadow: 0 1px 17px 0 rgba(0, 0, 0, 0.07);
    padding: 20px;
    flex: 1 0 20%;
    max-width: 22%;
    margin: 0 10px 25px 10px;
    img {
    width: 100%;
    }
    p{
    padding: 0;
    margin: 0;
    }
    h3 {
    padding: 0;
    margin: 0 0 10px 0;
    }
     button {
        background-color: white;
        border: red solid 1px;
        color: red;
        border-radius: 3px;
        padding: 5px 35px;
        width: 100%;
        font-size: 13px;
        text-align: center;
        cursor: pointer;
        transition: all 0.5s ease;
        margin-top: 15px;
        &:hover {
            opacity: 0.7;
            background: red;
            color: white;
        }
`;

class AddBrew extends Component {
    constructor() {
        super();
        this.state = {
            beerName: '',
            beerType: '',
            ABV: '',
            country: '',
            size: '',
            size2: '',
            price: '',
            price2: '',
            image: '',
            imageURL: '',
            isUploading: false,
            progress: 0,
            sizeInput: [],
            priceInput: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.appendInput = this.appendInput.bind(this);
    }

    appendInput() {
        let newSizeInput = `size${this.state.sizeInput.length + 2}`;
        this.setState({ sizeInput: this.state.sizeInput.concat([newSizeInput]) });
        let newPriceInput = `price${this.state.priceInput.length + 2}`;
        this.setState({ priceInput: this.state.priceInput.concat([newPriceInput]) });
    }

    removeInput() {
        this.setState({
            sizeInput: [],
            priceInput: []
        });
    }

    displayAddANother() {
        if (this.state.sizeInput.length === 0) {
            return (
                <AddSize onClick={() => this.appendInput()}>
                    <FontAwesomeIcon icon={faPlus} /> Add Size
                </AddSize>
            );
        } else {
            return (
                <AddSize onClick={() => this.removeInput()}>
                    <FontAwesomeIcon icon={faMinus} /> Remove Size
                </AddSize>
            );
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleUploadStart = () => this.setState({ isUploading: true, progress: 0, imageURL: '', image: '' });
    handleRemoveImage = () => this.setState({ imageURL: '', image: '' });
    handleProgress = progress => this.setState({ progress });
    handleUploadError = error => {
        this.setState({ isUploading: false });
        console.error(error);
    };

    handleUploadSuccess = filename => {
        const { googleData } = this.props;
        this.setState({ image: filename, isUploading: false });
        storage
            .ref('images/' + googleData.uid + '/' + this.state.beerName)
            .child(filename)
            .getDownloadURL()
            .then(url => this.setState({ imageURL: url }));
    };

    handleSubmit(e) {
        e.preventDefault();
        const { googleData, activeLocation } = this.props;
        console.log('test', activeLocation);
        const beerRef = database.ref(`${googleData.uid}/location/${activeLocation}/beer`);
        const beer = {
            beerName: this.state.beerName,
            beerType: this.state.beerType,
            ABV: this.state.ABV,
            country: this.state.country,
            size: this.state.size,
            size2: this.state.size2,
            price: this.state.price,
            price2: this.state.price2,
            image: this.state.imageURL
        };
        beerRef.push(beer);

        this.setState({
            beerName: '',
            beerType: '',
            ABV: '',
            country: '',
            size: '',
            size2: '',
            price: '',
            price2: '',
            image: '',
            imageURL: '',
            sizeInput: [],
            priceInput: []
        });
        beerRef.on('value', snapshot => {
            console.log(snapshot.val());
        });
    }

    removeItem(beerId) {
        const { googleData, activeLocation } = this.props;
        const beerRef = database.ref(`${googleData.uid}/location/${activeLocation}/beer/${beerId}`);
        beerRef.remove();
    }

    loadBeers() {
        const { userData, activeLocation } = this.props;
        console.log('Active Location', activeLocation);
        if (!userData.location[activeLocation]) {
            return <h2>Please select a Location</h2>;
        } else {
            if (!userData.location[activeLocation].beer) {
                return <h2>Yo, there is no beers for this location, add one above.</h2>;
            } else {
                return Object.keys(userData.location[activeLocation].beer).map(item => (
                    <BeerItem key={item}>
                        <h3>{userData.location[activeLocation].beer[item].beerName}</h3>
                        {userData.location[activeLocation].beer[item].image ? (
                            <img src={userData.location[activeLocation].beer[item].image} />
                        ) : (
                            ''
                        )}
                        <p>
                            {userData.location[activeLocation].beer[item].beerType}, ABV -{' '}
                            {userData.location[activeLocation].beer[item].ABV}
                        </p>
                        <p>{userData.location[activeLocation].beer[item].country}</p>
                        <p>
                            {userData.location[activeLocation].beer[item].size},{' '}
                            {userData.location[activeLocation].beer[item].price}
                        </p>
                        <p>
                            {userData.location[activeLocation].beer[item].size2
                                ? `${userData.location[activeLocation].beer[item].size2},  `
                                : ''}
                            {userData.location[activeLocation].beer[item].price2
                                ? userData.location[activeLocation].beer[item].price2
                                : ''}
                        </p>
                        <button onClick={() => this.removeItem(item)}>Remove Brewski</button>
                    </BeerItem>
                ));
            }
        }
    }

    loadTitle() {
        const { userData, activeLocation } = this.props;
        if (activeLocation && userData.location[activeLocation]) {
            return <h2>Beer List</h2>;
        } else {
            return '';
        }
    }

    imageUpload() {
        return (
            <div>
                <FontAwesomeIcon icon={faCloudUpload} />
                Upload Image
            </div>
        );
    }

    addBrewskis() {
        const { googleData, userData } = this.props;
        if (!userData.location) {
            return '';
        } else {
            return (
                <div>
                    <AddBrewWrapper>
                        <form onSubmit={this.handleSubmit}>
                            <AddBrewForm>
                                <label>
                                    Name of beer
                                    <input
                                        type="text"
                                        name="beerName"
                                        placeholder="Lagunitas, Fat Yak, etc"
                                        onChange={this.handleChange}
                                        value={this.state.beerName}
                                    />
                                </label>

                                <label>
                                    Type
                                    <input
                                        type="text"
                                        name="beerType"
                                        placeholder="Stout, Larger, IPA, etc."
                                        onChange={this.handleChange}
                                        value={this.state.beerType}
                                    />
                                </label>
                                <label>
                                    ABV
                                    <input
                                        type="text"
                                        name="ABV"
                                        placeholder="5.6%"
                                        onChange={this.handleChange}
                                        value={this.state.ABV}
                                    />
                                </label>
                                <label>
                                    Origin
                                    <input
                                        type="text"
                                        name="country"
                                        placeholder="Brooklyn, New York"
                                        onChange={this.handleChange}
                                        value={this.state.country}
                                    />
                                </label>
                                <label>
                                    Size
                                    <input
                                        type="text"
                                        name="size"
                                        placeholder="10oz, 14oz, etc"
                                        onChange={this.handleChange}
                                        value={this.state.size}
                                    />
                                </label>
                                <label>
                                    Price
                                    <input
                                        type="text"
                                        name="price"
                                        placeholder="$5"
                                        onChange={this.handleChange}
                                        value={this.state.price}
                                    />
                                </label>
                                {this.state.sizeInput.map(sizeInput => (
                                    <label key={sizeInput}>
                                        Size
                                        <input
                                            key={sizeInput}
                                            type="text"
                                            name={sizeInput}
                                            placeholder="10oz, 14oz"
                                            onChange={this.handleChange}
                                            value={this.state.size2}
                                        />
                                    </label>
                                ))}
                                {this.state.priceInput.map(priceInput => (
                                    <label key={priceInput}>
                                        Price
                                        <input
                                            key={priceInput}
                                            type="text"
                                            name={priceInput}
                                            placeholder="$5"
                                            onChange={this.handleChange}
                                            value={this.state.price2}
                                        />
                                    </label>
                                ))}
                            </AddBrewForm>
                            {this.displayAddANother()}
                            <UploadImageWrapper>
                                <label>Upload Image</label>
                                <UploadImage>
                                    {!this.state.image && !this.state.isUploading && this.imageUpload()}
                                    {this.state.isUploading && <SmallLoading />}
                                    {this.state.imageURL && <FontAwesomeIcon color="green" icon={faCheckCircle} />}
                                    <FileUploader
                                        hidden
                                        accept="image/*"
                                        name="beerLogo"
                                        randomizeFilename
                                        storageRef={storage.ref('images/' + googleData.uid + '/' + this.state.beerName)}
                                        onUploadStart={this.handleUploadStart}
                                        onUploadError={this.handleUploadError}
                                        onUploadSuccess={this.handleUploadSuccess}
                                        onProgress={this.handleProgress}
                                        maxHeight={300}
                                        maxWidth={300}
                                    />
                                </UploadImage>
                                <ImageWrapper>
                                    {this.state.imageURL && <Close onClick={() => this.handleRemoveImage()}>X</Close>}
                                    {this.state.imageURL && <img src={this.state.imageURL} />}
                                </ImageWrapper>
                            </UploadImageWrapper>
                            <button>Add Brewski 🍻</button>
                        </form>
                    </AddBrewWrapper>
                    <div>
                        <DisplayBeers>
                            {this.loadTitle()}
                            <BeerItemWrapper>{this.loadBeers()}</BeerItemWrapper>
                        </DisplayBeers>
                    </div>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <h1>Add Brewskis</h1>
                <SelectLocationPanel />
                {this.addBrewskis()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    googleData: state.googleData,
    userData: state.userData,
    activeLocation: state.activeLocation
});

export default connect(mapStateToProps)(AddBrew);

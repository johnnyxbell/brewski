import React, { Component } from 'react';
import firebase from './firebase';
import { connect } from 'react-redux';
import styled from 'styled-components';
import FileUploader from 'react-firebase-file-uploader';
import SmallLoading from './SmallLoading';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCloudUpload from '@fortawesome/fontawesome-free-solid/faCloudUploadAlt';
import faCheckCircle from '@fortawesome/fontawesome-free-solid/faCheckCircle';

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
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;

    label {
        flex-basis: 30%;
        margin: 10px 0;
        position: relative;
        text-align: left;
    }
    input {
        height: 25px;
        width: 100%;
        padding-left: 5px;
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
            price: '',
            image: '',
            imageURL: '',
            isUploading: false,
            progress: 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        firebase
            .storage()
            .ref('images/' + googleData.uid + '/' + this.state.beerName)
            .child(filename)
            .getDownloadURL()
            .then(url => this.setState({ imageURL: url }));
    };

    handleSubmit(e) {
        e.preventDefault();
        const { googleData } = this.props;
        const beerRef = firebase.database().ref(`${googleData.uid}/beer`);
        const beer = {
            beerName: this.state.beerName,
            beerType: this.state.beerType,
            ABV: this.state.ABV,
            country: this.state.country,
            size: this.state.size,
            price: this.state.price,
            image: this.state.imageURL
        };
        beerRef.push(beer);
        this.setState({
            beerName: '',
            beerType: '',
            ABV: '',
            country: '',
            size: '',
            price: '',
            image: '',
            imageURL: ''
        });
        beerRef.on('value', snapshot => {
            console.log(snapshot.val());
        });
    }

    removeItem(beerId) {
        const { googleData } = this.props;
        const beerRef = firebase.database().ref(`${googleData.uid}/beer/${beerId}`);
        beerRef.remove();
    }

    loadBeers() {
        const { beerList } = this.props;
        console.log('hi', beerList.beer);
        if (beerList.beer) {
            return Object.keys(beerList.beer).map(item => (
                <BeerItem key={item}>
                    <h3>{beerList.beer[item].beerName}</h3>
                    {beerList.beer[item].image ? <img src={beerList.beer[item].image} /> : ''}
                    <p>
                        {beerList.beer[item].beerType}, ABV - {beerList.beer[item].ABV}
                    </p>
                    <p>{beerList.beer[item].country}</p>
                    <p>
                        {beerList.beer[item].size}, {beerList.beer[item].price}
                    </p>
                    <button onClick={() => this.removeItem(item)}>Remove Brewski</button>
                </BeerItem>
            ));
        } else {
            return '';
        }
    }

    loadTitle() {
        const { beerList } = this.props;
        if (beerList) {
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

    render() {
        const { googleData } = this.props;
        console.log('state in addbrew', this.state);
        return (
            <div>
                <h1>Add Brewskis</h1>
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
                                Cost
                                <input
                                    type="text"
                                    name="price"
                                    placeholder="$5"
                                    onChange={this.handleChange}
                                    value={this.state.price}
                                />
                            </label>
                        </AddBrewForm>
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
                                    storageRef={firebase
                                        .storage()
                                        .ref('images/' + googleData.uid + '/' + this.state.beerName)}
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

const mapStateToProps = state => ({
    googleData: state.googleData,
    beerList: state.beerList
});

export default connect(mapStateToProps)(AddBrew);

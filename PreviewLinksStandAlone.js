import React,{ Component } from 'react';
import getUrls from 'get-urls';
import grabity from 'grabity';
import Header from "../components/Header";
import API from "../services/API";

const PreviewLinkUI = (props)=>
{
  console.log("props ", props);
  if(props.title)
  {
  return (

    <div className="row">
          <div className="col-md-3">
          <img className="img-thumbnail" src={props.image}/>
          </div>
          <div className="col-md-9">
              <a href={props.url}>{props.title}</a>
              <p>{props.description}</p>
          </div>
    </div>

);
  }
  else
  {
    return (<div>empty</div>  );
  }
}

export default class PreviewLinksStandAlone extends Component
{
  constructor(props)
  {
    super(props);
    this.state =
    {
      text:""
    }
    this.onInputChange = this.onInputChange.bind(this);
    this.getPreview = this.getPreview.bind(this);
  }


  //handle change of text inputs
  onInputChange(event){
    let text = event.target.value;
    let linkSet = getUrls(text);//returns a Set data type
    var linkArray = Array.from(linkSet); // [1, "some text"]
    if(linkArray.length > 0)
    {
      console.log('we have a link!', linkArray[0]);
      ///ger PreviewLink
      this.getPreview(linkArray[0]);
    }

    this.setState({ text:text });
  }

  getPreview(link)
  {
    console.log("link*************",link);
    API.postPreviewLink(link)
      .then((res)=>{
        console.log('res ',res);
        this.setState(
            {title:res.data.preview.title,description:res.data.preview.description, image:res.data.preview.image },
            function(){
              console.log("after set ****",this.state);
              });

      });

  }

render(){
    return(
      <div className="container">
      <input
        type="text"
        name="text"
        placeholder="enter a link"
        value={this.state.text}
        onChange={this.onInputChange}
      />
      <PreviewLinkUI
        title={this.state.title}
        description={this.state.description}
        image={this.state.image}
      />
    </div>
    )
  }
}

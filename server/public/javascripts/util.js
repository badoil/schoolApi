



var uploadFiles = (file, adminType, id) => {
    return new Promise(function (resolve, reject) {
        var tmpFileArray = [];
        

        var axiosUrlGetArray = [];
        var axiosUrlPutArray = [];
        var axiosUrlGetExtensionArray = [];
        var uploadUrlArray = [];
        var uploadPathArray = [];      
        var extensionArray = [];
        
        var results = []

        for (var i = 0; i < file.length; i++) {
            // console.log("name : ",file[i].name)
            var type = file[i].type
            if(file[i].name.includes("hwp")){
                type = "hwp"
            }
            var param = {
                type:type                
            }
            
            console.log('file : ',file)
            console.log('tmpFileArray : ',tmpFileArray)
            const apiRs1 = "http://localhost:3000/common/getExtension";
            var ax = axios.post(apiRs1, param)        
            axiosUrlGetExtensionArray.push(ax)
        }
        axios
        .all(axiosUrlGetExtensionArray)
        .then(axios.spread((...responses) => {
        responses.forEach(res => console.log('Success : '+res))
        // console.log('submitted all axios calls : ',responses);
        for(var i=0;i<responses.length;i++){
            const extension = responses[i].data.extension
            extensionArray.push(extension)
            console.log("extensionArray : ",extensionArray)
                if(extensionArray.length == file.length){
                    buildGetAxios();
                }
            }
        }))
        .catch(error => {
            console.log("error : ",error)
        })


        function buildGetAxios(){


            for (var i = 0; i < file.length; i++) {
                var extension = extensionArray[i]
                console.log("extension : ",extension)
                
                const apiRs1 = "http://localhost:3000/common/image/url?mimetype=" + file[i].type + "/*&idType=" + adminType + "&id=" + id+"&extension="+extension;
                var ax = axios.get(apiRs1)        
                axiosUrlGetArray.push(ax)
            }
            axios
            .all(axiosUrlGetArray)
            .then(axios.spread((...responses) => {
            responses.forEach(res => console.log('Success : '+res))
            console.log('submitted all axios calls : ',responses);
            for(var i=0;i<responses.length;i++){
                const signatureUrl = responses[i].data.url
                uploadPathArray.push(responses[i].data.path)
                uploadUrlArray.push(signatureUrl)
                if(uploadUrlArray.length == file.length){
                buildPutAxios();
                }
            }
            }))
            .catch(error => {})
    
        }

    
        function buildPutAxios(){
            // console.log("buildPutAxios : ", uploadUrlArray.length)
            for (var i = 0; i < uploadUrlArray.length; i++) {
                const apiRs1 = uploadUrlArray[i]
                const uploadFile = file[i]
                var ax = axios.put(apiRs1, uploadFile)        
                axiosUrlPutArray.push(ax)
            }
            axios
            .all(axiosUrlPutArray)
            .then(axios.spread((...responses) => {
                responses.forEach(res => console.log('Success : '+res))
                console.log('upload all axios calls : ',responses);        
    
                resolve(uploadPathArray)
                
            }))
            .catch(error => {})
        
        }
    });
    
  
}



function deleteFiles () {
    return new Promise(function (resolve, reject) {
      var idList = [540, 541, 542];
      var axiosDeleteArray = [];
      console.log(idList);
      for (var i = 0; i < idList.length; i++) {
          const url = "http://api.mziphop.co.kr/api/common/deleteFile/"+idList[i];
        // const url = "http://localhost:3000/api/common/deleteFile/"+idList[i];
          var ax = axios.delete(url);
          axiosDeleteArray.push(ax);
      }
      if(idList.length != axiosDeleteArray.length){
          return console.log('return!');
      }
      axios
      .all(axiosDeleteArray)
      .then(axios.spread((...responses) => {
        responses.forEach(res => console.log('Success : '+res))
        // console.log('submitted all axios calls : ',responses);
        }))
        resolve(true)
      .catch(error => {
          console.log("error : ",error)
      })
  });
 }
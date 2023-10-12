const storage= firebase.storage()
      //select all required elements
      const dropArea= document.querySelector('.dragDrop');
      let file;
      const img= document.querySelector('.img')
      const areaProgress=document.querySelector('.areaProgress')
      const bar= document.querySelector('#bar')
      const areaUpload=document.querySelector('.areaUpload')
      const made= document.querySelector('.made')
      const chooseFile = document.querySelector('.chooseFile')
      const copyLinkArea= document.querySelector('.copyLinkArea')
      const inputFile= document.querySelector('#inputFile')
      const btn = document.querySelector('#btn')

      btn.addEventListener('click',async()=>{
        let fileReader=new FileReader()
        inputFile.click()
        inputFile.onchange=()=>{
          let file=inputFile.files[0]
          upload(file)
        }
      })

      //If user drag file Over DragArea
      dropArea.addEventListener('dragover', (event)=>{
        event.preventDefault(); // preventingfrom deafult behaviour
        console.log('File is over drag')
      })

      //If user leave dragged file Over DragArea
      dropArea.addEventListener('dragleave', (event)=>{
        event.preventDefault(); // preventingfrom deafult behaviour
        console.log('File is outide from drag')
      })

      //If user drop file on DragArea
      dropArea.addEventListener('drop', (event)=>{
        event.preventDefault(); // preventingfrom deafult behaviour
        let fileReader= new FileReader()

        file = event.dataTransfer.files[0]

        upload(file)

        fileReader.readAsDataURL(file)
      })

      const copyLink=()=>{
        let link=document.getElementById('imgLink')
        link.select()
        document.execCommand('copy')
      }

      const upload=(file)=>{
        let uploaddask=storage.ref(`images/${file.name}`).put(file)

        uploaddask.on('state_change',(snapshot)=>{  
            areaUpload.style.display='none'
           areaProgress.style.display='block'
          let progress= (snapshot.bytesTransferred/snapshot.totalBytes)*100
          bar.style.width=progress
          // bar.classList.add('uplouding')

        },function(err){console.log(err)}, async function(){
            let imgUrl;
            await storage.ref(`images/${file.name}`).getDownloadURL().then((url)=>{
             document.getElementById('imgLink').value=url
             imgUrl=url
            })
            document.getElementById('title').innerHTML='Uploaded successfully'
            bar.classList.remove('uplouding')  
            areaProgress.style.display='none'
            areaUpload.style.display='block'
            made.style.display='block'
            chooseFile.style.display='none'
            img.src=imgUrl
            copyLinkArea.style.display='flex'
            console.log('teminado')
        })
      }

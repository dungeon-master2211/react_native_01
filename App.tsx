import  {View,Text,TextInput,ScrollView,SafeAreaView,TouchableOpacity,StyleSheet } from "react-native"
import {useState} from "react"
import * as Yup from 'yup'
import BouncyCheckbox  from 'react-native-bouncy-checkbox'
import { Formik } from "formik"
const appStyle = StyleSheet.create({
  headingText:{
    fontSize:30,
    fontWeight:'bold',
    textAlign:'center',
    padding:8,
    color:'#FFFFFF'
  },
  subtitle:{
    color:'#FFFFFF',
    padding:4,
    fontSize:20
  },
  container:{
    flex:1,
    flexDirection:"row",
    justifyContent:'space-between',
    alignItems:'center',
    padding:10
  },
  primaryBtnContainer:{
    backgroundColor:'#1565C0',
    borderRadius:4,
    width:100,
    justifyContent:'center',
    alignItems:'center'
  },
  primaryBtnText:{
    padding:8
  },
  secondaryBtnContainer:{
    backgroundColor:'#2E7D32',
    borderRadius:4,
    width:100,
    justifyContent:'center',
    alignItems:'center'
  },
  secondaryBtnText:{
    padding:8
  },
  inputBox:{
    borderColor:'#FFFFFF',
    borderWidth:1,
    width:80,
    padding:4,
    borderRadius:4
  },
  errorText:{
    color:'#D50000',
    padding:4
  },
  resultContainer:{
    backgroundColor:'#FFFFFF',
    justifyContent:'center',
    alignItems:'center',
    padding:8,
    margin:8,
    borderRadius:4
  },
  passwordText:{
    color:'#000000',
    fontSize:40
  },
  smallText:{
    color:'#000000'
  }
})
export default function App():JSX.Element{
  const [isLowerCase,setIsLowerCase] = useState(true)
  const [isUpperCase,setIsUpperCase] = useState(false)
  const [isSpecialChars,setIsSpecialChars] = useState(false)
  const [isNumbers,setIsNumbers] = useState(false)
  const [password,setPassword] = useState('')

function generatePasssword(passLen:number,passChars:string):string{
  let pass = ''
  for(let i=0;i<passLen;i++){
    const index = Math.round(Math.random()*passChars.length)
    pass+=passChars.charAt(index)
  }
  return pass
}

function setUpPassword(passLen:number){
  const smallcase = 'qwertyuiopasdfhjklzxcvbnm'
  const uppercase = 'QWERTYUIOPASDFGHJKLZXCVBNM'
  const symbols = '@#$%^&*!)(_'
  const numbers = '0123456789'
  let passChars = ''
  if (isLowerCase) passChars+=smallcase
  if(isUpperCase) passChars+=uppercase
  if(isNumbers) passChars+=numbers
  if(isSpecialChars) passChars+=symbols
  let generatedPassword = generatePasssword(passLen,passChars)
  setPassword(generatedPassword)
}
function resetGeneratedPassword(){
  setPassword('')
  setIsNumbers(false)
  setIsUpperCase(false)
  setIsSpecialChars(false)
  setIsLowerCase(true)
}
const validationSchema = Yup.object({
  passLength: Yup.number().required('Password Length is Required').min(6,'Min 6 length is allowed').max(16,'Max 16 length is allowed')
})
  return(<Formik initialValues={{ passLength: '' }}
  validationSchema={validationSchema}
  onSubmit={values => {
    console.log(values)
    setUpPassword(+values.passLength)
    }}
>
  {({ handleChange, handleReset,isValid, handleSubmit, values,errors,touched  }) => (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView>
        <Text style={appStyle.headingText}>Password Generator</Text>
        <View style={appStyle.container}>
          <View>
            <Text style={[appStyle.subtitle]}>Password Length: </Text>
            {touched && errors.passLength && <Text style={appStyle.errorText}>{errors.passLength}</Text>}
          </View>
          
          <TextInput  
            style={appStyle.inputBox}
            onChangeText={handleChange('passLength')}
            keyboardType="numeric"
            placeholder="Ex. 8"
            value={values.passLength}
          />
          
        </View>
        <View style={appStyle.container}>
          <Text style={[appStyle.subtitle]}>Contains Lower Case </Text>
          <BouncyCheckbox
            disableBuiltInState
            isChecked={isLowerCase}
            onPress={()=>setIsLowerCase(prev=>!prev)}
          />
        </View>
        <View style={appStyle.container}>
          <Text style={[appStyle.subtitle]}>Contains Upper Case </Text>
          <BouncyCheckbox
              disableBuiltInState
              isChecked={isUpperCase}
              onPress={()=>setIsUpperCase(prev=>!prev)}
              fillColor="#0277BD"
          />
        </View>
        <View style={appStyle.container}>
          <Text style={[appStyle.subtitle]}>Contains Numbers </Text>
          <BouncyCheckbox
                disableBuiltInState
                isChecked={isNumbers}
                onPress={()=>setIsNumbers(prev=>!prev)}
                fillColor="#7E57C2"
            />
        </View>
        <View style={appStyle.container}>
          <Text style={[appStyle.subtitle]}>Contains Special Characters </Text>
          <BouncyCheckbox
                disableBuiltInState
                isChecked={isSpecialChars} 
                onPress={()=>setIsSpecialChars(prev=>!prev)}
                fillColor="#D32F2F"
            />
        </View>
        <View style={appStyle.container}>
          <TouchableOpacity style={appStyle.primaryBtnContainer}
            disabled={!isValid}
            onPress={()=>handleSubmit()}
          >
            <Text style={appStyle.primaryBtnText}>Generate</Text>
          </TouchableOpacity>
          <TouchableOpacity style={appStyle.secondaryBtnContainer}
            onPress={()=>{handleReset()
            
            resetGeneratedPassword()}}
          >
            <Text style={appStyle.secondaryBtnText}>Reset</Text>
          </TouchableOpacity>
        </View>
        
          {password&&<View style={appStyle.resultContainer}>
            <Text style={appStyle.passwordText} selectable>{password}</Text>
            <Text style={appStyle.smallText}>Press and hold to copy/share</Text>
            </View>}
        
      </SafeAreaView>
        
    </ScrollView>
    
  )}
</Formik>)
}
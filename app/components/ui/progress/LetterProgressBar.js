export default function LetterProgressBar({
    letters = [],
    limit = 15,
    counter = 0
}) {
    
    return <div className="transition-transform duration-300 ease-in-out ">
    <div className="text-animation text-xl" style={{height: "80px"}}>
        {
            letters.slice(limit).map( e => {
                counter += 0.1 
                return <span className="pl-2 pt-2" key={counter} style={{animationDelay: `${counter}s`}}>{e}</span>
            })
        }
    </div>
  </div>
}
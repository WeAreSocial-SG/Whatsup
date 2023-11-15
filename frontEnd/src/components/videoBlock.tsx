export default function VideoBlock(props:{title:string, id:string, summary:string}){
    return <div className="videoBlock">
        <iframe className="videoBlock-iframe paddingRem" src={`https://www.youtube.com/embed/${props.id}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
        <div className="videoBlock-content paddingRem">
            <h2>{props.title}</h2>
            <p className="paddingRemVert">{props.summary}</p>
        </div>
    </div>
}
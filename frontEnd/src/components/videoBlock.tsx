export default function VideoBlock(props:{title:string, id:string, summary:string}){
    return <div className="videoBlock border">
        <iframe className="videoBlock-iframe paddingRem" src={`https://www.youtube.com/embed/${props.id}`} title="YouTube video player" allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
        <div className="videoBlock-content paddingRem">
            <h2 className="noto">{props.title}</h2>
            <p className="paddingRemVert">{props.summary}</p>
        </div>
    </div>
}
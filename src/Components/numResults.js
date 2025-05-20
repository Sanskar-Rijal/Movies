export default function NumResults(props) {
  return (
    <p className="num-results">
      Found <strong>{props.data.length}</strong> results.
    </p>
  );
}

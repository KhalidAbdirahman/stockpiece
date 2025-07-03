import type { UserProfile } from "../types";

type Props = {
  user: UserProfile;
  onUpload: (file: File) => void;
};

export default function WantedPoster({ user, onUpload }: Props) {
  return (
    <div className="text-center border p-3" style={{ backgroundColor: "#fbe6c2", borderRadius: "10px" }}>
      <h2 className="fw-bold" style={{ fontFamily: "serif" }}>
        WANTED
      </h2>
      <div className="my-3">
        {user.profilePictureUrl ? (
          <img
            src={user.profilePictureUrl}
            alt={user.username}
            className="img-fluid"
            style={{ maxHeight: "200px" }}
          />
        ) : (
          <div
            className="bg-secondary d-flex align-items-center justify-content-center"
            style={{ height: "200px" }}
          >
            <span className="text-white">No Picture</span>
          </div>
        )}
        <label className="btn btn-sm btn-outline-dark mt-2">
          Change Profile Picture
          <input
            type="file"
            hidden
            onChange={(e) => {
              if (e.target.files?.[0]) {
                onUpload(e.target.files[0]);
              }
            }}
          />
        </label>
      </div>
      <h3 style={{ fontFamily: "serif" }}>{user.username}</h3>
      <p>
        Net Worth: <span className="text-danger">{user.netWorth} Berries</span>
      </p>
      <p>
        Cash: <span className="text-danger">{user.cash} Berries</span>
      </p>
      <p>
        Profit/Loss Overall:{" "}
        <span className="text-success">{user.profitLoss}%</span>
      </p>
    </div>
  );
}

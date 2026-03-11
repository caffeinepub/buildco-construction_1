import Time "mo:core/Time";
import List "mo:core/List";

actor {
  type Submission = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Int;
  };

  let submissions = List.empty<Submission>();

  public shared ({ caller }) func submitForm(name : Text, email : Text, message : Text) : async () {
    let submission : Submission = {
      name;
      email;
      message;
      timestamp = Time.now();
    };
    submissions.add(submission);
  };

  public query ({ caller }) func getAllSubmissions() : async [Submission] {
    submissions.toArray();
  };
};

import { 
  db,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  doc,
  setDoc
} from "../configs/firbase.js";


// ---------------- SIGNUP FUNCTION ----------------
const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const fullName = document.getElementById("name").value.trim();

    try {
      // Create Auth User
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: fullName,
        email: email,
        createdAt: new Date().toISOString()
      });

      alert("Account created successfully!");
      window.location.href = "index.html";

    } catch (error) {
      alert(error.message);
    }
  });
}


// ---------------- LOGIN FUNCTION ----------------
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      window.location.href = "../dashboard/index.html";

    } catch (error) {
      alert(error.message);
    }
  });
}

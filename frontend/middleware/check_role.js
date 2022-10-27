
export default function ({$auth, redirect}){
    if (!$auth.user.is_admin) return redirect('/')
}
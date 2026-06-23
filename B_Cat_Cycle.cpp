#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        long long n, k;
        cin >> n >> k;

        if (n % 2 == 0) {
            cout << (k - 1) % n + 1 << '\n';
        } else {
            long long extra = (k - 1) / (n / 2);
            cout << ((k - 1 + extra) % n) + 1 << '\n';
        }
    }
    return 0;
}